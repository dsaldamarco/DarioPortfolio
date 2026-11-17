import { createContext, destroyContext, domToCanvas } from 'modern-screenshot';
import { GIFEncoder, applyPalette, quantize } from 'gifenc';

/**
 * Card export. The card is real DOM (CSS layers + blend modes + 3D transforms),
 * so we rasterize the DOM itself with modern-screenshot (SVG foreignObject),
 * after putting the card into an exact pose through the physics hook.
 */

// setPose writes styles synchronously, so a macrotask is enough between frames
// (no requestAnimationFrame: it stalls in background tabs).
const nextPaint = () => new Promise((resolve) => setTimeout(resolve, 0));

// ---------- Poses ----------

/** Still-photo angles: x/y = where the light/pointer sits on the card. */
export const PHOTO_ANGLES = [
  { value: 'front', label: 'Frontale', pose: { x: 0.5, y: 0.45, active: 0.6 } },
  { value: 'left', label: 'Sinistra', pose: { x: 0.12, y: 0.42 } },
  { value: 'right', label: 'Destra', pose: { x: 0.88, y: 0.38 } },
  { value: 'top', label: 'Dall’alto', pose: { x: 0.6, y: 0.08 } },
  { value: 'bottom', label: 'Dal basso', pose: { x: 0.3, y: 0.92 } },
];

const TAU = Math.PI * 2;

/** Looping motions for the GIF; t runs 0 → 1 (exclusive) over one loop. */
export const GIF_MOTIONS = [
  {
    value: 'sway',
    label: 'Oscilla',
    pose: (t) => ({ x: 0.5 + 0.38 * Math.sin(TAU * t), y: 0.45 - 0.12 * Math.cos(TAU * t) }),
  },
  {
    value: 'orbit',
    label: 'Orbita',
    pose: (t) => ({ x: 0.5 + 0.34 * Math.cos(TAU * t), y: 0.5 + 0.34 * Math.sin(TAU * t) }),
  },
  {
    value: 'spin',
    label: 'Giro 360°',
    spins: true,
    pose: (t) => ({ x: 0.5 + 0.25 * Math.sin(TAU * t), y: 0.42, flipOffset: 360 * t }),
  },
];

export const BACKGROUNDS = [
  { value: 'transparent', label: 'Trasparente', color: null },
  { value: 'dark', label: 'Scuro', color: '#0b0b0e' },
  { value: 'light', label: 'Chiaro', color: '#f2f1f4' },
];

// ---------- Capture ----------

/**
 * Pixel ratio that makes the output `targetWidth` px wide whatever the screen.
 * Uses the layout width: the stage may be visually scaled while exporting.
 */
const scaleFor = (node, targetWidth) => targetWidth / node.offsetWidth;

/**
 * modern-screenshot sizes its canvas from the on-screen rect, which is wrong
 * while the stage is visually scaled; pin it to the layout size instead.
 */
const sizeOptions = (node, targetWidth) => ({
  width: node.offsetWidth,
  height: node.offsetHeight,
  scale: scaleFor(node, targetWidth),
});

/** Which face points at the viewer for a given flip angle. */
export const sideForAngle = (deg) => (Math.cos((deg * Math.PI) / 180) >= 0 ? 'front' : 'back');

/** See .card-stage[data-capture] in holo.css. Pass null to clear. */
export function markVisibleSide(node, side) {
  const stage = node.querySelector('.card-stage');
  if (!stage) return;
  if (side) stage.dataset.capture = side;
  else delete stage.dataset.capture;
}

export async function capturePhoto(node, { width = 1400, background = null } = {}) {
  await nextPaint();
  const canvas = await domToCanvas(node, {
    ...sizeOptions(node, width),
    backgroundColor: background,
  });
  return canvasToBlob(canvas, 'image/png');
}

/**
 * Renders `frames` poses into an animated GIF.
 * applyPose(i) must put the card in pose i (synchronously or async).
 */
export async function captureGif(
  node,
  { frames = 36, delay = 60, width = 560, background = '#0b0b0e', applyPose, onProgress, signal },
) {
  const context = await createContext(node, {
    ...sizeOptions(node, width),
    backgroundColor: background,
  });
  const gif = GIFEncoder();
  try {
    for (let i = 0; i < frames; i++) {
      if (signal?.aborted) throw new DOMException('Annullato', 'AbortError');
      await applyPose(i);
      await nextPaint();
      const canvas = await domToCanvas(context);
      const { data, width: w, height: h } = canvas
        .getContext('2d', { willReadFrequently: true })
        .getImageData(0, 0, canvas.width, canvas.height);
      const palette = quantize(data, 256);
      gif.writeFrame(applyPalette(data, palette), w, h, { palette, delay });
      onProgress?.((i + 1) / frames);
    }
    gif.finish();
    return new Blob([gif.bytes()], { type: 'image/gif' });
  } finally {
    destroyContext(context);
  }
}

function canvasToBlob(canvas, type) {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Esportazione non riuscita'))), type),
  );
}

// ---------- Saving ----------

/**
 * Saves one or more files.
 * Phones/tablets: one share sheet with all files (lets you save straight to Photos).
 * Elsewhere, or if sharing isn't possible: normal downloads, one after the other.
 * `files` is [{ blob, name }].
 */
export async function saveFiles(files) {
  const list = files.map(({ blob, name }) => new File([blob], name, { type: blob.type }));
  const touch = window.matchMedia?.('(pointer: coarse)').matches;
  if (touch && navigator.canShare?.({ files: list })) {
    try {
      await navigator.share({ files: list });
      return;
    } catch (err) {
      if (err?.name === 'AbortError') return; // user closed the share sheet
    }
  }
  for (const [i, file] of list.entries()) {
    if (i > 0) await new Promise((r) => setTimeout(r, 350)); // browsers drop rapid-fire downloads
    const url = URL.createObjectURL(file);
    const a = Object.assign(document.createElement('a'), { href: url, download: file.name });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }
}

export const slug = (s) =>
  (s || 'carta')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'carta';
