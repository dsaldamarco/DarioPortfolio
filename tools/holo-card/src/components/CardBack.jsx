/**
 * Back face. Three background modes:
 *   pattern → CSS preset (.back-pattern[data-pattern]) on a tinted ground
 *   image   → uploaded image covering the whole back
 *   tile    → uploaded image repeated as a pattern
 * Without an uploaded image, image/tile fall back to the pattern.
 */
export default function CardBack({ settings, image }) {
  const {
    backMode,
    backPattern,
    backTint,
    backTileSize,
    backDim,
    backEmblem,
    backTitle,
    backSubtitle,
  } = settings;
  const mode = backMode !== 'pattern' && image ? backMode : 'pattern';
  const hasContent = backEmblem || backTitle || backSubtitle;

  return (
    <>
      <div className="card-frame">
        <div className="card-body card-back-body" data-tint={backTint}>
          {mode === 'pattern' && <div className="back-pattern" data-pattern={backPattern} aria-hidden />}
          {mode === 'image' && <img className="back-image" src={image} alt="" draggable={false} />}
          {mode === 'tile' && (
            <div
              className="back-tile"
              aria-hidden
              style={{ backgroundImage: `url("${image}")`, '--tile': `${backTileSize}cqw` }}
            />
          )}
          {mode !== 'pattern' && hasContent && (
            <div className="back-dim" style={{ opacity: backDim }} aria-hidden />
          )}

          {hasContent && (
            <div className="back-emblem">
              {backEmblem && <Emblem />}
              {backTitle && <span className="back-title">{backTitle}</span>}
              {backSubtitle && <span className="back-sub">{backSubtitle}</span>}
            </div>
          )}
        </div>
      </div>
      <div className="holo-foil back-foil" aria-hidden />
      <div className="card-glare" aria-hidden />
    </>
  );
}

function Emblem() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id="emblem-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff8fb1" />
          <stop offset=".35" stopColor="#ffd98a" />
          <stop offset=".65" stopColor="#7fe6ff" />
          <stop offset="1" stopColor="#b08cff" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill="none" stroke="url(#emblem-g)" strokeWidth="2.5" />
      <path d="M32 10l5.6 16.4L54 32l-16.4 5.6L32 54l-5.6-16.4L10 32l16.4-5.6z" fill="url(#emblem-g)" />
    </svg>
  );
}
