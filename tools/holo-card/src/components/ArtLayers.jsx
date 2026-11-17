/**
 * The card art as a stack of layers with 2.5D parallax.
 *
 * Why not real `preserve-3d` + `translateZ` here: the card face clips to its
 * rounded corners (overflow: hidden) and the foil blends onto the art
 * (mix-blend-mode). Both force the face to render flat, which would collapse
 * any translateZ. So each layer gets the exact offset that translateZ(depth)
 * produces under the card's current tilt:
 *
 *   x = depth · tan(rotateY)      y = −depth · tan(rotateX)
 *
 * computed in CSS from the --rx/--ry springs (see .art-layer in holo.css).
 * Only `transform` changes while the card moves, so it stays on the
 * compositor: no React renders and no repaints per frame.
 */

/** Where a document of aspect `doc` sits when it covers a frame of aspect `frame`, in %. */
function coverBox(doc, frame) {
  if (doc >= frame) {
    const w = (doc / frame) * 100;
    return { left: (100 - w) / 2, top: 0, width: w, height: 100 };
  }
  const h = (frame / doc) * 100;
  return { left: 0, top: (100 - h) / 2, width: 100, height: h };
}

const pct = (v) => `${v}%`;

/**
 * Scale per layer. Layers pushed back (negative depth) are enlarged just
 * enough that their edges never show at the maximum tilt; layers brought
 * forward grow slightly, like they would under perspective.
 */
function layerScale(depth, maxTilt) {
  if (depth < 0) return 1 + Math.abs(depth) * Math.tan((maxTilt * Math.PI) / 180) * 0.0058;
  return 1 + depth * 0.0007;
}

function Layer({ layer, art, box, maxTilt }) {
  const { depth } = layer;
  const img = layer.fill ? (
    <img src={layer.src} alt="" draggable={false} className="art-fill" />
  ) : (
    <img
      src={layer.src}
      alt=""
      draggable={false}
      style={{
        left: pct((layer.x / art.width) * 100),
        top: pct((layer.y / art.height) * 100),
        width: pct((layer.w / art.width) * 100),
        height: pct((layer.h / art.height) * 100),
      }}
    />
  );
  const boxStyle = {
    left: pct(box.left),
    top: pct(box.top),
    width: pct(box.width),
    height: pct(box.height),
  };
  const moving = depth !== 0;

  // The shadow falls on the plane below the layer: it sits `gap` px deeper,
  // so while the card tilts it slides the other way relative to the layer.
  const gap = Math.max(8, Math.abs(depth) * 0.6);
  return (
    <>
      {layer.shadow && (
        <div
          className="art-layer art-layer-shadow"
          data-moving=""
          aria-hidden
          style={{
            ...boxStyle,
            '--d': depth - gap,
            '--s': layerScale(depth, maxTilt),
            '--gap': gap,
            opacity: layer.opacity,
          }}
        >
          {img}
        </div>
      )}
      <div
        className="art-layer"
        data-moving={moving ? '' : undefined}
        style={{
          ...boxStyle,
          '--d': depth,
          '--s': layerScale(depth, maxTilt),
          opacity: layer.opacity,
          mixBlendMode: layer.blend !== 'normal' ? layer.blend : undefined,
        }}
      >
        {img}
      </div>
    </>
  );
}

/**
 * part: 'below' (under the foil), 'above' (crisp, over the foil) or 'all'.
 * frameAspect: width / height of the box the art covers.
 */
export default function ArtLayers({ art, part = 'all', frameAspect, maxTilt = 14, className = '' }) {
  const list = art.layers.filter((l) => l.visible && (part === 'all' || (part === 'above') === l.above));
  if (!list.length) return null;
  const box =
    art.kind === 'layers' ? coverBox(art.width / art.height, frameAspect) : { left: 0, top: 0, width: 100, height: 100 };
  return (
    <div className={`layer-root ${className}`} data-part={part}>
      {list.map((l) => (
        <Layer key={l.id} layer={l} art={art} box={box} maxTilt={maxTilt} />
      ))}
    </div>
  );
}
