/**
 * Glitter masks for .holo-sparkle.
 *
 * holo.css ships SVG feTurbulence textures as a fallback, but the exporter
 * (SVG foreignObject) can't render SVG filters inside a mask: the mask is
 * dropped and the whole rainbow layer washes over the card. Canvas-made PNG
 * textures work in both the live card and exported images.
 *
 * They are injected as a rule on .holo-sparkle only, NOT as custom properties
 * on :root: inherited custom properties get copied onto every cloned element
 * by the exporter, which made each GIF frame ~6x slower.
 */
const TILE_A = 128;
const TILE_B = 150;

function speckles(size, density, seed) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d');
  // Small deterministic PRNG: the same glitter on every visit.
  let s = seed;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const count = Math.round((size * size * density) / 2.2);
  for (let i = 0; i < count; i++) {
    const w = rnd() < 0.35 ? 2 : 1;
    const h = rnd() < 0.35 ? 2 : 1;
    g.fillStyle = `rgba(255,255,255,${(0.55 + rnd() * 0.45).toFixed(2)})`;
    g.fillRect(Math.floor(rnd() * size), Math.floor(rnd() * size), w, h);
  }
  return canvas.toDataURL('image/png');
}

export function installNoiseTextures() {
  try {
    const a = speckles(TILE_A, 0.34, 3);
    const b = speckles(TILE_B, 0.34, 11);
    const images = `url("${a}"), url("${b}")`;
    const sizes = `${TILE_A}px ${TILE_A}px, ${TILE_B}px ${TILE_B}px`;
    const style = document.createElement('style');
    style.id = 'holo-noise';
    // Extra class in the selector so it beats the fallback in holo.css.
    style.textContent = `.card-stage .holo-sparkle {
      -webkit-mask-image: ${images}; mask-image: ${images};
      -webkit-mask-size: ${sizes}; mask-size: ${sizes};
    }`;
    document.head.append(style);
  } catch {
    // Canvas unavailable: keep the SVG fallback from holo.css.
  }
}
