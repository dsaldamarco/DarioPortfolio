import React from 'react';
import { User } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-container glass-panel">
          <div className="badge-editorial">
            <User size={13} />
            <span>{t.about.title}</span>
          </div>

          <h2 className="about-title">{t.about.headline}</h2>

          <div className="bio-content">
            <p>{t.about.bioP1}</p>
            <p>{t.about.bioP2}</p>
            <p>{t.about.bioP3}</p>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          padding: var(--section-padding);
        }

        .about-container {
          padding: 3.5rem 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: var(--max-width);
          margin: 0 auto;
          text-align: left;
        }

        .about-title {
          font-size: clamp(2rem, 3.8vw, 3.25rem);
          line-height: 1.1;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .bio-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        @media (max-width: 680px) {
          .about-container {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};
