/**
 * Layered files → card layers.
 *
 * Every reader returns the same intermediate document:
 *   { width, height, layers: [{ name, canvas, x, y, opacity, blend, hidden, clip }], note? }
 * with layers ordered bottom → top. `finalizeDoc` then merges clipping masks,
 * scales the document down to a sensible size and turns each layer into a
 * blob URL that the card (and the exporter) can use like any image.
 *
 * Parsers are loaded on demand, so plain PNG/JPG users never download them.
 */

const IMAGE_EXT = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'avif', 'svg'];
const LAYERED_EXT = ['psd', 'psb', 'procreate', 'tif', 'tiff', 'ora', 'kra', 'zip'];

export const ACCEPT = [...IMAGE_EXT, ...LAYERED_EXT].map((e) => `.${e}`).join(',');
export const MAX_IMAGE_MB = 25;
export const MAX_LAYERED_MB = 300;
/** Longest side of a layered document after import. Plenty for a 1400 px export. */
const MAX_DOC_SIDE = 2048;

export const extOf = (file) => (file?.name?.split('.').pop() ?? '').toLowerCase();
export const isImageFile = (file) =>
  IMAGE_EXT.includes(extOf(file)) || (file?.type?.startsWith('image/') && !['image/tiff', 'image/vnd.adobe.photoshop'].includes(file.type));
export const isLayeredFile = (file) => LAYERED_EXT.includes(extOf(file));

// ---------------------------------------------------------------------------
// Blend modes
// ---------------------------------------------------------------------------
const CSS_BLENDS = new Set([
  'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn',
  'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity',
  'plus-lighter',
]);
const BLEND_ALIASES = {
  'pass through': 'normal',
  'color dodge': 'color-dodge',
  'color burn': 'color-burn',
  'hard light': 'hard-light',
  'soft light': 'soft-light',
  'linear dodge': 'plus-lighter',
  add: 'plus-lighter',
  'lighter color': 'lighten',
  'darker color': 'darken',
  'linear burn': 'multiply',
  'vivid light': 'hard-light',
  'linear light': 'hard-light',
  'pin light': 'hard-light',
  'hard mix': 'hard-light',
};
export function cssBlend(mode) {
  if (!mode) return 'normal';
  const m = String(mode).toLowerCase().replace(/^svg:/, '');
  const v = BLEND_ALIASES[m] ?? m.replace(/ /g, '-');
  return CSS_BLENDS.has(v) ? v : 'normal';
}
const canvasBlend = (css) => (css === 'plus-lighter' ? 'lighter' : css === 'normal' ? 'source-over' : css);

// ---------------------------------------------------------------------------
// Canvas helpers
// ---------------------------------------------------------------------------
export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  return c;
}

export const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Immagine non leggibile'));
    img.src = src;
  });

async function blobToCanvas(blob) {
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadImage(url);
    const c = makeCanvas(img.naturalWidth, img.naturalHeight);
    c.getContext('2d').drawImage(img, 0, 0);
    return c;
  } finally {
    URL.revokeObjectURL(url);
  }
}

const bytesToBlob = (bytes, type = 'image/png') => new Blob([bytes], { type });

/** Draws visible layers into one canvas whose longest side is `maxSide`. */
export function compositeDoc(doc, maxSide = 512, { order } = {}) {
  const s = Math.min(1, maxSide / Math.max(doc.width, doc.height));
  const out = makeCanvas(doc.width * s, doc.height * s);
  const g = out.getContext('2d');
  for (const l of order ?? doc.layers) {
    if (l.hidden || !l.canvas) continue;
    g.globalAlpha = l.opacity ?? 1;
    g.globalCompositeOperation = canvasBlend(cssBlend(l.blend));
    g.drawImage(l.canvas, l.x * s, l.y * s, l.canvas.width * s, l.canvas.height * s);
  }
  return out;
}

/** Bakes clipping-mask layers into the layer they clip (like the source app shows them). */
function mergeClipping(layers) {
  const out = [];
  for (const l of layers) {
    const base = out[out.length - 1];
    if (l.clip && base && base.canvas && l.canvas) {
      if (l.hidden) continue;
      const tmp = makeCanvas(base.canvas.width, base.canvas.height);
      const t = tmp.getContext('2d');
      t.drawImage(l.canvas, l.x - base.x, l.y - base.y);
      t.globalCompositeOperation = 'destination-in';
      t.drawImage(base.canvas, 0, 0);
      const merged = makeCanvas(base.canvas.width, base.canvas.height);
      const m = merged.getContext('2d');
      m.drawImage(base.canvas, 0, 0);
      m.globalAlpha = l.opacity ?? 1;
      m.globalCompositeOperation = canvasBlend(cssBlend(l.blend));
      m.drawImage(tmp, 0, 0);
      base.canvas = merged;
      continue;
    }
    out.push({ ...l });
  }
  return out;
}

/** Crops fully transparent borders (big Procreate layers are mostly empty). */
function trim(layer) {
  const { canvas } = layer;
  const { width: w, height: h } = canvas;
  const data = canvas.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, w, h).data;
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    const row = y * w * 4;
    for (let x = 0; x < w; x++) {
      if (data[row + x * 4 + 3] !== 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;
  if (minX === 0 && minY === 0 && maxX === w - 1 && maxY === h - 1) return layer;
  const c = makeCanvas(maxX - minX + 1, maxY - minY + 1);
  c.getContext('2d').drawImage(canvas, -minX, -minY);
  return { ...layer, canvas: c, x: layer.x + minX, y: layer.y + minY };
}

const toBlobURL = (canvas) =>
  new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(URL.createObjectURL(b)) : reject(new Error('Esportazione livello fallita'))), 'image/png'),
  );

let nextId = 0;
const newId = () => `l${Date.now().toString(36)}${(nextId++).toString(36)}`;

export const CARD_ASPECT = 63 / 88;

/** Guess a starting depth: background at the back, top layers forward. */
export function autoDepths(count, { min = -24, max = 32 } = {}) {
  if (count <= 1) return [0];
  return Array.from({ length: count }, (_, i) => Math.round(min + ((max - min) * i) / (count - 1)));
}

/** Intermediate doc → card art state (blob URLs, ids, default controls). */
export async function finalizeDoc(doc, { source }) {
  let layers = mergeClipping(doc.layers.filter((l) => l.canvas && l.canvas.width && l.canvas.height));
  if (!layers.length) throw new Error('Il file non contiene livelli con pixel.');

  const s = Math.min(1, MAX_DOC_SIDE / Math.max(doc.width, doc.height));
  const width = Math.round(doc.width * s);
  const height = Math.round(doc.height * s);
  layers = layers
    .map((l) => {
      if (s === 1) return l;
      const c = makeCanvas(l.canvas.width * s, l.canvas.height * s);
      const g = c.getContext('2d');
      g.imageSmoothingQuality = 'high';
      g.drawImage(l.canvas, 0, 0, c.width, c.height);
      return { ...l, canvas: c, x: l.x * s, y: l.y * s };
    })
    .map((l) => (l.trim ? trim(l) : l))
    .filter(Boolean);

  const preview = await toBlobURL(compositeDoc({ width, height, layers }, 320));
  const depths = autoDepths(layers.length);
  const items = await Promise.all(
    layers.map(async (l, i) => ({
      id: newId(),
      name: l.name || `Livello ${i + 1}`,
      src: await toBlobURL(l.canvas),
      x: l.x,
      y: l.y,
      w: l.canvas.width,
      h: l.canvas.height,
      opacity: l.opacity ?? 1,
      blend: cssBlend(l.blend),
      visible: !l.hidden,
      depth: layers.length > 1 ? depths[i] : 0,
      shadow: false,
      above: false,
    })),
  );
  const aspect = width / height;
  return {
    kind: 'layers',
    source,
    width,
    height,
    // A document shaped like the card is probably a full-card design.
    area: Math.abs(aspect - CARD_ASPECT) < 0.06 ? 'card' : 'art',
    layers: items,
    preview,
    note: doc.note ?? '',
  };
}

/** A plain image: one layer at depth 0 that covers the art window. */
export function singleImageArt(src, name = 'Immagine') {
  return {
    kind: 'image',
    source: 'image',
    width: null,
    height: null,
    area: 'art',
    preview: src,
    note: '',
    layers: [
      { id: newId(), name, src, fill: true, opacity: 1, blend: 'normal', visible: true, depth: 0, shadow: false, above: false },
    ],
  };
}

const artURLs = (art) => (art ? [art.preview, ...art.layers.map((l) => l.src)] : []);

/** Frees the blob URLs owned by `art`, except those still used by `keep`. */
export function releaseArt(art, keep) {
  const used = new Set(artURLs(keep));
  for (const u of new Set(artURLs(art))) if (u?.startsWith('blob:') && !used.has(u)) URL.revokeObjectURL(u);
}

/** Flattens an art state into one image blob URL (for the back of the card). */
export async function flattenArt(art) {
  const imgs = await Promise.all(art.layers.map((l) => loadImage(l.src)));
  const w = art.width ?? imgs[0].naturalWidth;
  const h = art.height ?? imgs[0].naturalHeight;
  const doc = {
    width: w,
    height: h,
    layers: art.layers.map((l, i) => {
      const c = makeCanvas(imgs[i].naturalWidth, imgs[i].naturalHeight);
      c.getContext('2d').drawImage(imgs[i], 0, 0);
      return { canvas: c, x: l.x ?? 0, y: l.y ?? 0, opacity: l.opacity, blend: l.blend, hidden: !l.visible };
    }),
  };
  return toBlobURL(compositeDoc(doc, 2048));
}

// ---------------------------------------------------------------------------
// Readers
// ---------------------------------------------------------------------------
const SOURCE_LABEL = {
  psd: 'Photoshop',
  psb: 'Photoshop',
  procreate: 'Procreate',
  tif: 'TIFF',
  tiff: 'TIFF',
  ora: 'OpenRaster',
  kra: 'Krita',
  zip: 'ZIP',
};

/**
 * Reads one layered file, or several images at once (each becomes a layer,
 * in file-name order, first = bottom).
 */
export async function readLayers(files) {
  if (files.length > 1) {
    const images = files.filter(isImageFile);
    if (!images.length) throw new Error('Nessuna immagine tra i file scelti.');
    return finalizeDoc(await readImageList(images.map((f) => ({ name: f.name, blob: f }))), { source: `${images.length} immagini` });
  }
  const file = files[0];
  const ext = extOf(file);
  const bytes = new Uint8Array(await file.arrayBuffer());
  let doc;
  switch (ext) {
    case 'psd':
    case 'psb':
      doc = await readPsdFile(bytes);
      break;
    case 'procreate':
      doc = await readProcreate(bytes);
      break;
    case 'tif':
    case 'tiff':
      doc = await readTiff(bytes);
      break;
    case 'ora':
      doc = await readOra(bytes);
      break;
    case 'kra':
      doc = await readKra(bytes);
      break;
    case 'zip':
      doc = await readZip(bytes);
      break;
    default:
      throw new Error('Formato non supportato.');
  }
  return finalizeDoc(doc, { source: SOURCE_LABEL[ext] ?? ext.toUpperCase() });
}

// --- Photoshop / Fresco ------------------------------------------------------
async function readPsdFile(bytes) {
  const { readPsd } = await import('ag-psd');
  const opts = { skipThumbnail: true, skipLinkedFilesData: true, skipCompositeImageData: true };
  let psd = readPsd(bytes, opts);
  const layers = [];

  const walk = (children, hidden, opacity) => {
    for (const l of children ?? []) {
      const isHidden = hidden || Boolean(l.hidden);
      const op = opacity * (l.opacity ?? 1);
      if (l.children) {
        walk(l.children, isHidden, op);
        continue;
      }
      if (!l.canvas || !l.canvas.width || !l.canvas.height) continue; // adjustment / empty layers
      layers.push({
        name: l.name,
        canvas: applyPsdMask(l),
        x: l.left ?? 0,
        y: l.top ?? 0,
        opacity: op,
        blend: l.blendMode,
        hidden: isHidden,
        clip: Boolean(l.clipping),
      });
    }
  };
  walk(psd.children, false, 1);

  if (!layers.length) {
    // Flat PSD: use the composite image as the only layer.
    psd = readPsd(bytes, { skipThumbnail: true, skipLinkedFilesData: true });
    if (psd.canvas) layers.push({ name: 'Sfondo', canvas: psd.canvas, x: 0, y: 0, opacity: 1 });
  }
  return { width: psd.width, height: psd.height, layers };
}

/** ag-psd returns layer pixels and the layer mask separately: apply the mask. */
function applyPsdMask(layer) {
  const mask = layer.mask;
  if (!mask?.canvas || mask.disabled) return layer.canvas;
  const { width: w, height: h } = layer.canvas;
  const out = makeCanvas(w, h);
  const g = out.getContext('2d', { willReadFrequently: true });
  g.drawImage(layer.canvas, 0, 0);
  const img = g.getImageData(0, 0, w, h);
  const mw = mask.canvas.width;
  const mh = mask.canvas.height;
  const md = mask.canvas.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, mw, mh).data;
  const dx = (layer.left ?? 0) - (mask.left ?? 0);
  const dy = (layer.top ?? 0) - (mask.top ?? 0);
  const outside = mask.defaultColor ?? 255;
  const d = img.data;
  for (let y = 0; y < h; y++) {
    const my = y + dy;
    for (let x = 0; x < w; x++) {
      const mx = x + dx;
      const m = mx >= 0 && my >= 0 && mx < mw && my < mh ? md[(my * mw + mx) * 4] : outside;
      if (m !== 255) d[(y * w + x) * 4 + 3] = (d[(y * w + x) * 4 + 3] * m) / 255;
    }
  }
  g.putImageData(img, 0, 0);
  return out;
}

// --- Procreate ---------------------------------------------------------------
// Blend mode numbers used by Procreate's SilicaLayer.
const PROCREATE_BLENDS = {
  0: 'normal', 1: 'multiply', 2: 'screen', 3: 'add', 4: 'lighten', 5: 'exclusion', 6: 'difference',
  7: 'normal', 8: 'linear burn', 9: 'color dodge', 10: 'color burn', 11: 'overlay', 12: 'hard light',
  13: 'color', 14: 'luminosity', 15: 'hue', 16: 'saturation', 17: 'soft light', 19: 'darken',
  20: 'hard mix', 21: 'vivid light', 22: 'linear light', 23: 'pin light', 24: 'lighter color',
  25: 'darker color',
};

async function readProcreate(bytes) {
  const [{ unzipSync }, { parseBplist, keyedArchive }, { decodeTile }] = await Promise.all([
    import('fflate'),
    import('./bplist.js'),
    import('./codecs.js'),
  ]);
  const zip = unzipSync(bytes, { filter: (f) => !f.name.startsWith('video/') });
  const thumbEntry = zip['QuickLook/Thumbnail.png'];
  const thumb = thumbEntry ? await blobToCanvas(bytesToBlob(thumbEntry)) : null;

  const fallback = (why) => {
    if (!thumb) throw new Error(`File Procreate non leggibile (${why}).`);
    return {
      width: thumb.width,
      height: thumb.height,
      layers: [{ name: 'Anteprima', canvas: thumb, x: 0, y: 0, opacity: 1 }],
      note: 'Livelli Procreate non leggibili: uso l’anteprima piatta. Da Procreate puoi esportare in PSD.',
    };
  };

  try {
    const archiveBytes = zip['Document.archive'];
    if (!archiveBytes) return fallback('manca Document.archive');
    const ar = keyedArchive(parseBplist(archiveBytes));
    const doc = ar.root();
    const size = String(ar.get(doc, 'size') ?? '').match(/[\d.]+/g)?.map(Number);
    if (!size || size.length < 2) return fallback('dimensioni mancanti');
    const [W, H] = size;
    const T = Number(ar.get(doc, 'tileSize')) || 256;
    const cols = Math.ceil(W / T);
    const rows = Math.ceil(H / T);

    // Index chunk files by layer UUID.
    const chunks = new Map();
    for (const name of Object.keys(zip)) {
      const m = name.match(/^([^/]+)\/(\d+)~(\d+)/);
      if (!m) continue;
      if (!chunks.has(m[1])) chunks.set(m[1], []);
      chunks.get(m[1]).push({ col: +m[2], row: +m[3], data: zip[name] });
    }

    const layers = [];
    const readLayer = (L, hidden, opacity) => {
      const children = ar.get(L, 'children');
      const isHidden = hidden || Boolean(ar.get(L, 'hidden'));
      const op = opacity * (ar.get(L, 'opacity') ?? 1);
      if (Array.isArray(children)) {
        // Groups list children top → bottom like the root array.
        for (const c of [...children].reverse()) readLayer(c, isHidden, op);
        return;
      }
      const uuid = ar.get(L, 'UUID');
      const tiles = chunks.get(uuid);
      if (!tiles?.length) return;
      // Canvas only as big as the tiles that exist (empty tiles aren't stored).
      const valid = tiles.filter((t) => t.col < cols && t.row < rows);
      if (!valid.length) return;
      const c0 = Math.min(...valid.map((t) => t.col));
      const r0 = Math.min(...valid.map((t) => t.row));
      const c1 = Math.max(...valid.map((t) => t.col));
      const r1 = Math.max(...valid.map((t) => t.row));
      const canvas = makeCanvas(Math.min(W, (c1 + 1) * T) - c0 * T, Math.min(H, (r1 + 1) * T) - r0 * T);
      const g = canvas.getContext('2d');
      for (const { col, row, data } of valid) {
        const tw = col === cols - 1 && W % T ? W % T : T;
        const th = row === rows - 1 && H % T ? H % T : T;
        const px = decodeTile(data, tw * th * 4);
        // Procreate stores premultiplied alpha.
        for (let i = 0; i < px.length; i += 4) {
          const a = px[i + 3];
          if (a && a < 255) {
            px[i] = Math.min(255, (px[i] * 255) / a);
            px[i + 1] = Math.min(255, (px[i + 1] * 255) / a);
            px[i + 2] = Math.min(255, (px[i + 2] * 255) / a);
          }
        }
        g.putImageData(
          new ImageData(new Uint8ClampedArray(px.buffer, px.byteOffset, px.length), tw, th),
          (col - c0) * T,
          (row - r0) * T,
        );
      }
      const blend = ar.get(L, 'extendedBlend') ?? ar.get(L, 'blend');
      layers.push({
        name: ar.get(L, 'name') || 'Livello',
        canvas,
        x: c0 * T,
        y: r0 * T,
        opacity: op,
        blend: PROCREATE_BLENDS[blend] ?? 'normal',
        hidden: isHidden,
        clip: Boolean(ar.get(L, 'clipped')),
        trim: true,
      });
    };
    // Root array is top → bottom; we want bottom → top.
    const list = ar.get(doc, 'layers') ?? [];
    for (const L of [...list].reverse()) readLayer(L, false, 1);
    if (!layers.length) return fallback('nessun livello');

    if (!ar.get(doc, 'backgroundHidden')) {
      const bg = makeCanvas(W, H);
      const g = bg.getContext('2d');
      g.fillStyle = procreateColor(ar.get(doc, 'backgroundColor'));
      g.fillRect(0, 0, W, H);
      layers.unshift({ name: 'Sfondo', canvas: bg, x: 0, y: 0, opacity: 1 });
    }

    const out = { width: W, height: H, layers };
    return thumb ? matchOrientation(out, thumb) : out;
  } catch (err) {
    console.warn('[holo] Procreate:', err);
    return fallback(err.message);
  }
}

function procreateColor(data) {
  try {
    if (data instanceof Uint8Array && data.length >= 12) {
      const f = new Float32Array(data.slice(0, 16).buffer);
      const c = (v) => Math.round(Math.min(1, Math.max(0, v)) * 255);
      return `rgb(${c(f[0])} ${c(f[1])} ${c(f[2])})`;
    }
  } catch {
    /* fall through */
  }
  return '#ffffff';
}

/**
 * Procreate stores tiles in the canvas' own orientation (the user may have
 * rotated or flipped the canvas). The QuickLook thumbnail always shows the
 * picture the right way up, so try the 8 possible orientations and keep the
 * one that matches it best.
 */
function matchOrientation(doc, thumb) {
  const N = 48;
  const ref = makeCanvas(N, N);
  ref.getContext('2d').drawImage(thumb, 0, 0, N, N);
  const refData = ref.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, N, N).data;
  const flat = compositeDoc(doc, 256);

  let best = 0;
  let bestScore = Infinity;
  for (let k = 0; k < 8; k++) {
    const rot = k % 4;
    const swap = rot % 2 === 1;
    const tw = swap ? flat.height : flat.width;
    const th = swap ? flat.width : flat.height;
    // Aspect must agree with the thumbnail (when the canvas isn't square).
    if (Math.abs(tw / th - thumb.width / thumb.height) > 0.05) continue;
    const c = makeCanvas(N, N);
    const g = c.getContext('2d', { willReadFrequently: true });
    g.translate(N / 2, N / 2);
    if (k >= 4) g.scale(-1, 1);
    g.rotate((rot * Math.PI) / 2);
    const [dw, dh] = swap ? [N, N] : [N, N];
    g.drawImage(flat, -dw / 2, -dh / 2, dw, dh);
    const d = g.getImageData(0, 0, N, N).data;
    let score = 0;
    for (let i = 0; i < d.length; i += 4) {
      score += Math.abs(d[i] - refData[i]) + Math.abs(d[i + 1] - refData[i + 1]) + Math.abs(d[i + 2] - refData[i + 2]);
    }
    if (score < bestScore) {
      bestScore = score;
      best = k;
    }
  }
  if (best === 0) return doc;
  return orientDoc(doc, best);
}

/** Applies rotation (k % 4 quarter turns) and mirror (k >= 4) to every layer. */
function orientDoc(doc, k) {
  const rot = k % 4;
  const swap = rot % 2 === 1;
  const W = swap ? doc.height : doc.width;
  const H = swap ? doc.width : doc.height;
  const m = new DOMMatrix()
    .translate(W / 2, H / 2)
    .scale(k >= 4 ? -1 : 1, 1)
    .rotate(rot * 90)
    .translate(-doc.width / 2, -doc.height / 2);
  const layers = doc.layers.map((l) => {
    // Bounding box of the layer after the transform: keeps canvases small.
    const pts = [
      [l.x, l.y],
      [l.x + l.canvas.width, l.y],
      [l.x, l.y + l.canvas.height],
      [l.x + l.canvas.width, l.y + l.canvas.height],
    ].map(([x, y]) => m.transformPoint(new DOMPoint(x, y)));
    const bx = Math.round(Math.min(...pts.map((p) => p.x)));
    const by = Math.round(Math.min(...pts.map((p) => p.y)));
    const bw = Math.round(Math.max(...pts.map((p) => p.x))) - bx;
    const bh = Math.round(Math.max(...pts.map((p) => p.y))) - by;
    const c = makeCanvas(bw, bh);
    const g = c.getContext('2d');
    g.setTransform(new DOMMatrix().translate(-bx, -by).multiply(m));
    g.drawImage(l.canvas, l.x, l.y);
    return { ...l, canvas: c, x: bx, y: by };
  });
  return { ...doc, width: W, height: H, layers };
}

// --- TIFF --------------------------------------------------------------------
async function readTiff(bytes) {
  const UTIF = (await import('utif')).default;
  const buf = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  const ifds = UTIF.decode(buf).filter((ifd) => !((ifd.t254?.[0] ?? 0) & 1)); // skip reduced-res thumbnails
  if (!ifds.length) throw new Error('TIFF senza immagini.');
  const pages = ifds.map((ifd, i) => {
    UTIF.decodeImage(buf, ifd, ifds);
    const rgba = UTIF.toRGBA8(ifd);
    const c = makeCanvas(ifd.width, ifd.height);
    c.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(rgba.buffer, rgba.byteOffset, ifd.width * ifd.height * 4), ifd.width, ifd.height), 0, 0);
    // Page offsets (GIMP writes them): XPosition/YPosition are in resolution units.
    const xres = ifd.t282?.[0] ?? 72;
    const yres = ifd.t283?.[0] ?? 72;
    const x = Math.round((ifd.t286?.[0] ?? 0) * xres);
    const y = Math.round((ifd.t287?.[0] ?? 0) * yres);
    return { name: ifd.t285?.[0] || `Pagina ${i + 1}`, canvas: c, x, y, opacity: 1 };
  });
  const width = Math.max(...pages.map((p) => p.x + p.canvas.width));
  const height = Math.max(...pages.map((p) => p.y + p.canvas.height));
  const photoshopLayers = ifds.some((ifd) => ifd.t37724);
  if (pages.length === 1) {
    return {
      width,
      height,
      layers: pages,
      note: photoshopLayers
        ? 'I livelli dei TIFF di Photoshop non sono leggibili nel browser: uso l’immagine unita. Salva come PSD per averli separati.'
        : 'Il TIFF ha un solo livello.',
    };
  }
  // Multi-page TIFF: the first page is the top of the stack.
  return { width, height, layers: pages.reverse() };
}

// --- OpenRaster (Krita, MyPaint, GIMP…) -------------------------------------
async function readOra(bytes) {
  const { unzipSync, strFromU8 } = await import('fflate');
  const zip = unzipSync(bytes);
  const xml = zip['stack.xml'];
  if (!xml) throw new Error('OpenRaster senza stack.xml.');
  const dom = new DOMParser().parseFromString(strFromU8(xml), 'application/xml');
  const image = dom.querySelector('image');
  const width = +image.getAttribute('w');
  const height = +image.getAttribute('h');
  const layers = [];
  // Children are listed top → bottom: collect, then reverse.
  const walk = async (stack, hidden, opacity, ox, oy) => {
    const found = [];
    for (const el of stack.children) {
      const h = hidden || el.getAttribute('visibility') === 'hidden';
      const op = opacity * parseFloat(el.getAttribute('opacity') ?? '1');
      const x = ox + (+el.getAttribute('x') || 0);
      const y = oy + (+el.getAttribute('y') || 0);
      if (el.tagName === 'stack') {
        found.push(...(await walk(el, h, op, x, y)));
      } else if (el.tagName === 'layer') {
        const data = zip[el.getAttribute('src')];
        if (!data) continue;
        found.push({
          name: el.getAttribute('name') || 'Livello',
          canvas: await blobToCanvas(bytesToBlob(data)),
          x,
          y,
          opacity: op,
          blend: el.getAttribute('composite-op'),
          hidden: h,
        });
      }
    }
    return found;
  };
  const root = dom.querySelector('image > stack');
  layers.push(...(await walk(root, false, 1, 0, 0)).reverse());
  return { width, height, layers };
}

// --- Krita (.kra) ------------------------------------------------------------
async function readKra(bytes) {
  const { unzipSync } = await import('fflate');
  const zip = unzipSync(bytes, { filter: (f) => f.name === 'mergedimage.png' });
  const merged = zip['mergedimage.png'];
  if (!merged) throw new Error('File Krita senza immagine unita.');
  const canvas = await blobToCanvas(bytesToBlob(merged));
  return {
    width: canvas.width,
    height: canvas.height,
    layers: [{ name: 'Immagine unita', canvas, x: 0, y: 0, opacity: 1 }],
    note: 'Da Krita i livelli arrivano uniti. Esporta in OpenRaster (.ora) o PSD per averli separati.',
  };
}

// --- ZIP of images / multiple files -----------------------------------------
async function readZip(bytes) {
  const { unzipSync } = await import('fflate');
  const zip = unzipSync(bytes, {
    filter: (f) => IMAGE_EXT.includes(f.name.split('.').pop().toLowerCase()) && !/(^|\/)(__MACOSX|\._)/.test(f.name),
  });
  const entries = Object.entries(zip).map(([name, data]) => ({
    name: name.split('/').pop(),
    blob: bytesToBlob(data, name.toLowerCase().endsWith('.svg') ? 'image/svg+xml' : undefined),
  }));
  if (!entries.length) throw new Error('Lo ZIP non contiene immagini.');
  return readImageList(entries);
}

/** True when (a downscaled copy of) the image has no transparent pixels. */
function isOpaque(canvas) {
  const c = makeCanvas(64, 64);
  const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(canvas, 0, 0, 64, 64);
  const d = g.getImageData(0, 0, 64, 64).data;
  for (let i = 3; i < d.length; i += 4) if (d[i] < 250) return false;
  return true;
}

/** Images in natural file-name order (01, 02, … 10), first = bottom. */
async function readImageList(entries) {
  const sorted = [...entries].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const layers = [];
  for (const e of sorted) {
    const canvas = await blobToCanvas(e.blob);
    layers.push({ name: e.name.replace(/\.[^.]+$/, ''), canvas, x: 0, y: 0, opacity: 1, opaque: isOpaque(canvas) });
  }
  // A picture without transparency can only be a background: keep those at
  // the bottom, so "sfondo.png" never hides "personaggio.png".
  layers.sort((a, b) => b.opaque - a.opaque);
  const width = Math.max(...layers.map((l) => l.canvas.width));
  const height = Math.max(...layers.map((l) => l.canvas.height));
  // Smaller images are centred on the largest one.
  for (const l of layers) {
    l.x = Math.round((width - l.canvas.width) / 2);
    l.y = Math.round((height - l.canvas.height) / 2);
  }
  return { width, height, layers };
}
