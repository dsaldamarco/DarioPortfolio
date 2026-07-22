import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onContactClick }) => {
  const { t } = useLanguage();

  return (
    <section id="about" className="hero-section">
      <div className="container hero-container">
        {/* Role Badge: Dario Saldamarco — UX/UI Designer */}
        <div className="hero-badge-wrapper">
          <div className="badge-editorial">
            <Sparkles size={13} className="badge-icon" />
            <span>{t.hero.role}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="hero-title">
          {t.hero.headline}
        </h1>

        {/* Subtitle / Bio */}
        <p className="hero-subtitle">
          {t.hero.subtitle}
        </p>

        {/* Action CTAs */}
        <div className="hero-cta-group">
          <button onClick={onExploreClick} className="btn-primary">
            <span>{t.hero.ctaWork}</span>
            <ArrowRight size={16} />
          </button>
          <button onClick={onContactClick} className="btn-glass">
            <span>{t.hero.ctaContact}</span>
          </button>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 10.5rem;
          padding-bottom: 5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: left;
          width: 100%;
          box-sizing: border-box;
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 960px;
          width: 100%;
        }

        .hero-badge-wrapper {
          margin-bottom: 1.5rem;
        }

        .badge-icon {
          color: var(--accent-primary);
        }

        .hero-title {
          margin-bottom: 1.75rem;
          font-size: clamp(2.4rem, 5.2vw + 0.5rem, 4.35rem);
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          max-width: 900px;
        }

        .hero-subtitle {
          max-width: 820px;
          margin-bottom: 2.75rem;
          font-size: clamp(1.05rem, 1.2vw + 0.4rem, 1.25rem);
          color: var(--text-secondary);
          line-height: 1.65;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.75rem;
          border-radius: var(--radius-full);
          font-size: 0.9375rem;
          font-weight: 600;
          background: var(--text-primary);
          color: var(--text-inverse);
          transition: all var(--transition-fast);
        }

        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .btn-glass {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.75rem;
          border-radius: var(--radius-full);
          font-size: 0.9375rem;
          font-weight: 500;
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          backdrop-filter: var(--glass-blur);
          transition: all var(--transition-fast);
        }

        .btn-glass:hover {
          background: var(--bg-card-hover);
          border-color: var(--text-secondary);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 7rem;
            padding-bottom: 3.5rem;
            text-align: center;
          }
          .hero-container {
            align-items: center;
            text-align: center;
          }
          .hero-title {
            text-align: center;
            font-size: clamp(2.1rem, 7vw, 3rem);
          }
          .hero-subtitle {
            text-align: center;
            font-size: 1rem;
          }
          .hero-cta-group {
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
          }
          .btn-primary, .btn-glass {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};
