import HoloLayers from './HoloLayers';

export default function CardFront({ image, settings }) {
  const { name, subtitle, description, foilArea, number } = settings;

  return (
    <>
      <div className="card-frame">
        <div className="card-body">
          <header className="card-header">
            <span className="card-name">{name || 'Senza nome'}</span>
            {subtitle && <span className="card-badge">{subtitle}</span>}
          </header>

          <div className="card-art">
            <img src={image} alt="" draggable={false} />
            {foilArea === 'art' && <HoloLayers />}
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
      <div className="card-glare" aria-hidden />
    </>
  );
}
