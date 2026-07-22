import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const Education: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="education" className="education-section">
      <div className="container">
        {/* Section Header: Single rounded rectangle badge, no repeating title */}
        <div className="section-header">
          <div className="badge-editorial">
            <GraduationCap size={13} />
            <span>{t.education.title}</span>
          </div>
          <p className="section-desc">{t.education.subtitle}</p>
        </div>

        {/* Education Timeline */}
        <div className="education-list">
          {t.education.items.map((item, idx) => (
            <div key={idx} className="education-card glass-panel">
              <div className="edu-card-header">
                <div className="edu-title-stack">
                  <h3 className="edu-institution">{item.institution}</h3>
                  <span className="edu-role">{item.role}</span>
                </div>
                <div className="edu-period">
                  <Calendar size={13} />
                  <span>{item.period}</span>
                </div>
              </div>

              <div className="edu-desc-box">
                {item.desc.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="edu-paragraph">{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .education-section {
          padding: var(--section-padding);
          width: 100%;
          box-sizing: border-box;
        }

        .section-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          margin-bottom: 3.5rem;
          width: 100%;
        }

        .section-desc {
          text-align: left;
          max-width: 720px;
          margin-top: 1rem;
          margin-bottom: 1rem;
          font-size: 1.125rem;
          color: var(--text-secondary);
        }

        .education-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: var(--max-width);
          margin: 0 auto;
          width: 100%;
        }

        .education-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: left;
          width: 100%;
          box-sizing: border-box;
          transition: transform var(--transition-normal), border-color var(--transition-normal);
        }

        .education-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-medium);
        }

        .edu-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .edu-title-stack {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .edu-institution {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.2;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .edu-role {
          font-size: 1rem;
          font-weight: 600;
          color: var(--accent-primary);
        }

        .edu-period {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .edu-desc-box {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .edu-paragraph {
          font-size: 1.05rem;
          line-height: 1.68;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .section-header {
            align-items: center;
            text-align: center;
            margin-bottom: 2.5rem;
          }
          .section-desc {
            text-align: center;
            margin-top: 0.85rem;
          }
          .education-card {
            padding: 1.5rem 1.25rem;
            align-items: center;
            text-align: center;
          }
          .edu-card-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.75rem;
          }
          .edu-title-stack {
            align-items: center;
            text-align: center;
          }
          .edu-paragraph {
            text-align: center;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
};
