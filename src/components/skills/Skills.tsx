import React from 'react';
import { Wrench, Layout, Smartphone, Cpu } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/projects';
import { useLanguage } from '../../i18n/LanguageContext';

export const Skills: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        {/* Section Header: Single rounded rectangle badge, no repeating title */}
        <div className="section-header">
          <div className="badge-editorial">
            <Wrench size={13} />
            <span>{t.skills.title}</span>
          </div>
          <p className="section-desc">{t.skills.subtitle}</p>
        </div>

        {/* Skill Category Cards */}
        <div className="skills-grid">
          {/* UX/UI Category */}
          <div className="skill-category-card glass-panel">
            <div className="category-header">
              <div className="icon-wrapper">
                <Layout size={20} />
              </div>
              <h3 className="category-title">{t.skills.categories.uxui}</h3>
            </div>
            <div className="skill-cloud">
              {SKILL_CATEGORIES.uxui.map((skill, idx) => (
                <span key={idx} className="skill-chip">{skill}</span>
              ))}
            </div>
          </div>

          {/* Product Category */}
          <div className="skill-category-card glass-panel">
            <div className="category-header">
              <div className="icon-wrapper">
                <Smartphone size={20} />
              </div>
              <h3 className="category-title">{t.skills.categories.product}</h3>
            </div>
            <div className="skill-cloud">
              {SKILL_CATEGORIES.product.map((skill, idx) => (
                <span key={idx} className="skill-chip">{skill}</span>
              ))}
            </div>
          </div>

          {/* Tools Category */}
          <div className="skill-category-card glass-panel">
            <div className="category-header">
              <div className="icon-wrapper">
                <Cpu size={20} />
              </div>
              <h3 className="category-title">{t.skills.categories.tools}</h3>
            </div>
            <div className="skill-cloud">
              {SKILL_CATEGORIES.tools.map((skill, idx) => (
                <span key={idx} className="skill-chip accent">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .skills-section {
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

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: var(--max-width);
          margin: 0 auto;
          width: 100%;
        }

        .skill-category-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--accent-primary);
        }

        .category-title {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .skill-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .skill-chip {
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .skill-chip:hover {
          color: var(--text-primary);
          border-color: var(--border-medium);
          transform: translateY(-1px);
        }

        .skill-chip.accent {
          background: rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.25);
          color: var(--text-primary);
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
          .skills-grid {
            grid-template-columns: 1fr;
          }
          .skill-category-card {
            padding: 1.5rem 1.25rem;
            align-items: center;
            text-align: center;
          }
          .category-header {
            justify-content: center;
          }
          .skill-cloud {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};
