export default function CardBack() {
  return (
    <>
      <div className="card-frame">
        <div className="card-body card-back-body">
          <div className="back-rings" aria-hidden />
          <div className="back-emblem">
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
              <path
                d="M32 10l5.6 16.4L54 32l-16.4 5.6L32 54l-5.6-16.4L10 32l16.4-5.6z"
                fill="url(#emblem-g)"
              />
            </svg>
            <span className="back-title">Holo Studio</span>
            <span className="back-sub">Trading Card Series</span>
          </div>
        </div>
      </div>
      <div className="holo-foil back-foil" aria-hidden />
      <div className="card-glare" aria-hidden />
    </>
  );
}
