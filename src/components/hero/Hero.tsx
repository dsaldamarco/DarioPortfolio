import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onContactClick }) => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="hero-section">
      {/* Animated Purple Gradient Orb */}
      <div className="hero-purple-orb"></div>

      <div className="container hero-container">
        {/* Avatar Presentation Card */}
        <div className="hero-profile-header">
          <div className={`hero-avatar-frame ${scrolled ? 'hidden' : ''}`}>
            <img src="/dario-icon.png" alt="Dario Saldamarco" className="hero-avatar-img" />
            <span className="hero-avatar-status"></span>
          </div>
          
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
          padding-top: 11.5rem;
          padding-bottom: 5.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: left;
          width: 100%;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        /* Animated Violet-Purple Orb Overlay */
        .hero-purple-orb {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 650px;
          height: 650px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, rgba(217, 70, 239, 0.2) 45%, rgba(139, 92, 246, 0) 70%);
          filter: blur(90px);
          z-index: -1;
          pointer-events: none;
          animation: orbFloat 12s ease-in-out infinite alternate;
        }

        @keyframes orbFloat {
          0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            background: radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, rgba(217, 70, 239, 0.2) 45%, rgba(139, 92, 246, 0) 70%);
          }
          50% {
            transform: translate(-40%, -45%) scale(1.15) rotate(180deg);
            background: radial-gradient(circle, rgba(217, 70, 239, 0.5) 0%, rgba(139, 92, 246, 0.25) 45%, rgba(217, 70, 239, 0) 70%);
          }
          100% {
            transform: translate(-60%, -55%) scale(0.9) rotate(360deg);
            background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(217, 70, 239, 0.18) 45%, rgba(139, 92, 246, 0) 70%);
          }
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 960px;
          width: 100%;
          z-index: 2;
        }

        /* Profile Header */
        .hero-profile-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          transition: gap 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-profile-header:has(.hero-avatar-frame.hidden) {
          gap: 0px;
        }

        .hero-avatar-frame {
          position: relative;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          padding: 4px;
          background: linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%);
          box-shadow: 0 12px 32px rgba(139, 92, 246, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      height 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.4s ease,
                      transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      margin-right 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      padding 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          flex-shrink: 0;
          opacity: 1;
          transform: scale(1);
        }

        .hero-avatar-frame.hidden {
          opacity: 0;
          transform: scale(0.4) translateY(-30px);
          width: 0px;
          height: 0px;
          margin-right: 0px;
          padding: 0px;
          pointer-events: none;
          border: none;
        }

        .hero-avatar-frame:hover:not(.hidden) {
          transform: scale(1.05);
        }

        .hero-avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          background: var(--bg-secondary);
          border: 3px solid var(--bg-secondary);
          transition: opacity var(--transition-fast) ease;
        }

        .hero-avatar-frame.hidden .hero-avatar-img {
          opacity: 0;
        }

        .hero-avatar-status {
          position: absolute;
          bottom: 6px;
          right: 6px;
          width: 16px;
          height: 16px;
          background: #10b981;
          border: 3px solid var(--bg-primary);
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          transition: opacity var(--transition-fast) ease;
        }

        .hero-avatar-frame.hidden .hero-avatar-status {
          opacity: 0;
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
            padding-top: 7.5rem;
            padding-bottom: 3.5rem;
          }
          .hero-container {
            align-items: center;
            text-align: center;
          }
          .hero-profile-header {
            flex-direction: column;
            gap: 0.85rem;
            align-items: center;
            margin-bottom: 1.5rem;
          }
          .hero-profile-header:has(.hero-avatar-frame.hidden) {
            gap: 0px;
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
