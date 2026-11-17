import { useLayoutEffect, useRef, useState } from 'react';
import HoloLayers from './HoloLayers';
import ArtLayers from './ArtLayers';

const ART_ASPECT = 5 / 4; // .card-art
const CARD_ASPECT = 63 / 88;

/**
 * Position of .card-art inside the card face, from layout offsets (they
 * ignore transforms, so the tilt doesn't disturb the measurement).
 */
function useArtRect(ref, enabled) {
  const [rect, setRect] = useState(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return undefined;
    const measure = () => {
      let x = 0;
      let y = 0;
      let node = el;
      while (node && !node.classList.contains('card-face')) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent;
      }
      setRect({
        left: x,
        top: y,
        width: el.offsetWidth,
        height: el.offsetHeight,
        borderRadius: getComputedStyle(el).borderRadius,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, enabled]);
  return enabled ? rect : null;
}

export default function CardFront({ art, settings }) {
  const { name, subtitle, description, foilArea, number, tilt } = settings;
  const artRef = useRef(null);
  const hasAbove = art.layers.some((l) => l.visible && l.above);
  const fullCard = art.kind === 'layers' && art.area === 'card';
  // With the foil over the whole card, "above holo" layers need their own
  // box over the art window, painted after the foil.
  const overlay = useArtRect(artRef, !fullCard && foilArea === 'full' && hasAbove);

  // Full-card design from a layered file: the layers are the whole face.
  if (fullCard) {
    return (
      <>
        <div className="layer-backing" aria-hidden />
        <ArtLayers art={art} part="below" frameAspect={CARD_ASPECT} maxTilt={tilt} className="layer-card" />
        <HoloLayers />
        <ArtLayers art={art} part="above" frameAspect={CARD_ASPECT} maxTilt={tilt} className="layer-card" />
        <div className="card-glare" aria-hidden />
      </>
    );
  }

  return (
    <>
      <div className="card-frame">
        <div className="card-body">
          <header className="card-header">
            <span className="card-name">{name || 'Senza nome'}</span>
            {subtitle && <span className="card-badge">{subtitle}</span>}
          </header>

          <div className="card-art" ref={artRef}>
            <ArtLayers art={art} part="below" frameAspect={ART_ASPECT} maxTilt={tilt} />
            {foilArea === 'art' && (
              <>
                <HoloLayers />
                <ArtLayers art={art} part="above" frameAspect={ART_ASPECT} maxTilt={tilt} />
              </>
            )}
          </div>

          <p className="card-info">{description}</p>

          <footer className="card-footer">
            <span>{number}</span>
            <span className="card-rarity">
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
              </svg>
              Holo Rare
            </span>
          </footer>
        </div>
      </div>

      {foilArea === 'full' && <HoloLayers />}
      {overlay && (
        <div className="art-overlay" style={overlay}>
          <ArtLayers art={art} part="above" frameAspect={ART_ASPECT} maxTilt={tilt} />
        </div>
      )}
      <div className="card-glare" aria-hidden />
    </>
  );
}
