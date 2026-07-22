import React, { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { type Project } from '../../data/projects';
import { useLanguage } from '../../i18n/LanguageContext';
import { DeviceFrame } from './DeviceFrame';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const { language, t } = useLanguage();
  const [iconError, setIconError] = useState(false);

  const description = language === 'it' ? project.description.it : project.description.en;
  const subtitle = language === 'it' ? project.subtitle.it : project.subtitle.en;

  return (
    <div className="project-card glass-panel" onClick={() => onSelect(project)}>
      {/* Identity Header Stack */}
      <div className="card-identity-header">
        {!iconError ? (
          <img 
            src={project.appIcon} 
            alt={`${project.title} App Icon`} 
            className="app-identity-icon"
            onError={() => setIconError(true)}
          />
        ) : (
          <div className="app-identity-fallback" style={{ background: project.accentColor }}>
            <Sparkles size={26} color="#ffffff" />
          </div>
        )}

        <div className="title-stack">
          <div className="title-row">
            <h3 className="card-title">{project.title}</h3>
            <span className="card-year">{project.year}</span>
          </div>

          <span className="card-subtitle" style={{ color: project.accentColor }}>
            {subtitle}
          </span>

          <div className="card-roles-row">
            {project.role.map((r, idx) => (
              <span key={idx} className="role-pill-badge">{r}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="card-description">{description}</p>

      {/* Uncropped Media Showcase */}
      <div className="card-preview">
        <DeviceFrame 
          projectId={project.id} 
          accentColor={project.accentColor} 
          folderPath={project.folderPath}
          title={project.title}
          images={project.images}
        />
      </div>

      {/* Footer */}
      <div className="card-footer">
        <div className="focus-pills">
          {project.focus.slice(0, 3).map((item, idx) => (
            <span key={idx} className="focus-pill">{item}</span>
          ))}
        </div>

        <button className="case-study-btn">
          <span>{t.work.readStory}</span>
          <ArrowUpRight size={15} />
        </button>
      </div>

      <style>{`
        .project-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          cursor: pointer;
          position: relative;
          text-align: left;
          width: 100%;
          box-sizing: border-box;
          border: none;
          transition: transform var(--transition-normal), background var(--transition-normal), box-shadow var(--transition-normal);
        }

        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
        }

        .card-identity-header {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          text-align: left;
        }

        .app-identity-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          object-fit: cover;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
          border: none;
          flex-shrink: 0;
          display: block;
        }

        .app-identity-fallback {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
          border: none;
          flex-shrink: 0;
        }

        .title-stack {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 0.25rem;
          width: 100%;
        }

        .title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .card-title {
          font-size: 1.95rem;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
          text-align: left;
        }

        .card-year {
          color: var(--text-tertiary);
          font-weight: 500;
          font-size: 0.85rem;
        }

        .card-subtitle {
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-align: left;
        }

        .card-roles-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.25rem;
        }

        .role-pill-badge {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          border: none;
        }

        .card-description {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          text-align: left;
        }

        .card-preview {
          margin-top: 0.25rem;
          width: 100%;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1rem;
          margin-top: auto;
        }

        .focus-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .focus-pill {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .case-study-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          transition: color var(--transition-fast);
        }

        .project-card:hover .case-study-btn {
          color: var(--accent-primary);
        }

        @media (max-width: 768px) {
          .project-card {
            padding: 1.5rem 1.25rem;
            align-items: center;
            text-align: center;
          }
          .card-identity-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.85rem;
          }
          .title-stack {
            align-items: center;
            text-align: center;
          }
          .title-row {
            justify-content: center;
            gap: 0.5rem;
          }
          .card-title {
            font-size: 1.65rem;
            text-align: center;
          }
          .card-subtitle {
            text-align: center;
          }
          .card-roles-row {
            justify-content: center;
          }
          .card-description {
            text-align: center;
            font-size: 0.95rem;
          }
          .card-footer {
            flex-direction: column;
            gap: 0.85rem;
            align-items: center;
            text-align: center;
          }
          .focus-pills {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};
