import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <section id="projects" className="projects-section-v2">
      <div className="container">
        {/* Header Block */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="section-header-v2"
        >
          <div className="badge-editorial-v2 grid-badge">
            <span>{t.work.title}</span>
          </div>
          <p className="section-desc-v2">
            {t.work.subtitle}
          </p>

          {/* Filter Pill Tabs */}
          <div className="filter-bar-v2">
            <button 
              className={`filter-tab-v2 ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <span>{t.work.all}</span>
            </button>
            <button 
              className={`filter-tab-v2 ${filter === 'uxui' ? 'active' : ''}`}
              onClick={() => setFilter('uxui')}
            >
              <span>UX/UI & Product</span>
            </button>
            <button 
              className={`filter-tab-v2 ${filter === 'ios' ? 'active' : ''}`}
              onClick={() => setFilter('ios')}
            >
              <span>iOS & Swift</span>
            </button>
            <button 
              className={`filter-tab-v2 ${filter === 'game' ? 'active' : ''}`}
              onClick={() => setFilter('game')}
            >
              <span>Game Design</span>
            </button>
          </div>
        </motion.div>

        {/* 2-Columns Grid Layout */}
        <motion.div 
          layout
          className="projects-grid-v2"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                className="grid-item-col"
              >
                <ProjectCard 
                  project={project} 
                  onSelect={onSelectProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .projects-section-v2 {
          padding: 8rem 2rem;
          width: 100%;
          box-sizing: border-box;
          background: var(--bg-primary);
          position: relative;
          z-index: 2;
        }

        .section-header-v2 {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          margin-bottom: 4rem;
          width: 100%;
        }

        .section-desc-v2 {
          text-align: left;
          max-width: 780px;
          margin-top: 1.25rem;
          margin-bottom: 2.5rem;
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        /* Filter pill system */
        .filter-bar-v2 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.3rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          max-width: 100%;
          overflow-x: auto;
        }

        .filter-tab-v2 {
          padding: 0.55rem 1.35rem;
          border-radius: var(--radius-full);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          border: 1px solid transparent;
        }

        .filter-tab-v2:hover {
          color: var(--text-primary);
        }

        .filter-tab-v2.active {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
          border-color: var(--border-medium);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        /* 2 Column Responsive Grid */
        .projects-grid-v2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
          width: 100%;
        }

        .grid-item-col {
          height: 100%;
        }

        @media (max-width: 900px) {
          .projects-grid-v2 {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .projects-section-v2 {
            padding: var(--section-padding);
          }
          .section-header-v2 {
            align-items: center;
            text-align: center;
            margin-bottom: 2.5rem;
          }
          .section-desc-v2 {
            text-align: center;
          }
          .filter-bar-v2 {
            align-self: center;
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  );
};
