import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const Experience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        {/* Section Header: Single rounded rectangle badge, no repeating title */}
        <div className="section-header">
          <div className="badge-editorial">
            <Briefcase size={13} />
            <span>{t.experience.title}</span>
          </div>
          <p className="section-desc">{t.experience.subtitle}</p>
        </div>

        {/* Timeline */}
        <div className="experience-timeline">
          {t.experience.items.map((item, idx) => (
            <div key={idx} className="experience-card glass-panel">
              <div className="exp-header">
                <div className="exp-title-stack">
                  <h3 className="exp-company">{item.company}</h3>
                  <span className="exp-role">{item.role}</span>
                </div>

                <div className="exp-period">
                  <Calendar size={13} />
                  <span>{item.period}</span>
                </div>
              </div>

              <p className="exp-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .experience-section {
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

        .experience-timeline {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: var(--max-width);
          margin: 0 auto;
          width: 100%;
        }

        .experience-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          text-align: left;
          width: 100%;
          box-sizing: border-box;
          transition: transform var(--transition-normal), border-color var(--transition-normal);
        }

        .experience-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-medium);
        }

        .exp-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .exp-title-stack {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .exp-company {
          font-size: 1.45rem;
          font-weight: 700;
          line-height: 1.2;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .exp-role {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--accent-primary);
        }

        .exp-period {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .exp-desc {
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
          .experience-card {
            padding: 1.5rem 1.25rem;
            align-items: center;
            text-align: center;
          }
          .exp-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.75rem;
          }
          .exp-title-stack {
            align-items: center;
            text-align: center;
          }
          .exp-desc {
            text-align: center;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
};
