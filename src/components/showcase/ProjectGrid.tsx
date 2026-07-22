import React, { useState } from 'react';
import { PROJECTS } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { useLanguage } from '../../i18n/LanguageContext';
import { type Project } from '../../data/projects';

interface ProjectGridProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onSelectProject }) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'uxui' | 'ios' | 'game'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Section Header: Single rounded rectangle badge, no repeating title */}
        <div className="section-header">
          <div className="badge-editorial">
            <span>{t.work.title}</span>
          </div>
          <p className="section-desc">{t.work.subtitle}</p>

          {/* Filter Bar */}
          <div className="filter-bar">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <span>{t.work.all}</span>
            </button>
            <button 
              className={`filter-tab ${filter === 'uxui' ? 'active' : ''}`}
              onClick={() => setFilter('uxui')}
            >
              <span>UX/UI & Product</span>
            </button>
            <button 
              className={`filter-tab ${filter === 'ios' ? 'active' : ''}`}
              onClick={() => setFilter('ios')}
            >
              <span>iOS & Swift</span>
            </button>
            <button 
              className={`filter-tab ${filter === 'game' ? 'active' : ''}`}
              onClick={() => setFilter('game')}
            >
              <span>Game Design</span>
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onSelect={onSelectProject} 
            />
          ))}
        </div>
      </div>

      <style>{`
        .projects-section {
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
          margin-bottom: 2.25rem;
          font-size: 1.125rem;
          color: var(--text-secondary);
        }

        .filter-bar {
          display: flex;
          align-items: center;
          align-self: flex-start;
          gap: 0.5rem;
          padding: 0.35rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          max-width: 100%;
        }

        .filter-tab {
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          white-space: nowrap;
        }

        .filter-tab:hover {
          color: var(--text-primary);
        }

        .filter-tab.active {
          background: var(--bg-card-hover);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-medium);
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
          gap: 2.5rem;
          width: 100%;
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
          .filter-bar {
            align-self: center;
            justify-content: center;
            flex-wrap: wrap;
            border-radius: var(--radius-lg);
            width: 100%;
          }
          .filter-tab {
            font-size: 0.8rem;
            padding: 0.4rem 0.85rem;
          }
          .project-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
        }
      `}</style>
    </section>
  );
};
