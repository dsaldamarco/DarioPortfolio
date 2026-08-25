import React from 'react';
import { BookOpen } from 'lucide-react';
import { type Project } from '../../data/projects';
import { DeviceFrame } from './DeviceFrame';
import { useLanguage } from '../../i18n/LanguageContext';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const { t, language } = useLanguage();
  const isIt = language === 'it';
  
  const subtitle = isIt ? project.subtitle.it : project.subtitle.en;
  const description = isIt ? project.description.it : project.description.en;

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(project);
  };

  return (
    <div className="project-card-v2" onClick={handleModalClick}>
      {/* Top Device Visual Container */}
      <div className="card-visual-frame">
        <DeviceFrame 
          projectId={project.id}
          accentColor={project.accentColor}
          folderPath={project.folderPath}
          images={project.images}
          title={project.title}
        />
        
        {/* Overlay Year Label */}
        <div className="card-year-badge monospace">{project.year}</div>
      </div>

      {/* Description Info Content */}
      <div className="card-info-pane">
        {/* Meta Header */}
        <div className="info-meta-row monospace">
          <span className="meta-category" style={{ color: project.accentColor }}>
            [{project.category.toUpperCase()}]
          </span>
          <span className="meta-bullet">•</span>
          <span className="meta-roles">{project.role.join(', ')}</span>
        </div>

        {/* Title Block with AppIcon */}
        <div className="info-title-row">
          <img 
            src={project.appIcon} 
            alt={`${project.title} icon`} 
            className="info-app-icon"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="title-stack">
            <h3 className="info-title serif-text">{project.title}</h3>
            <p className="info-subtitle">{subtitle}</p>
          </div>
        </div>

        {/* Short Summary Description */}
        <p className="info-description">{description}</p>

        {/* Focus Area Tags */}
        <div className="info-tags-grid">
          {project.focus.slice(0, 3).map((tag, tagIdx) => (
            <span key={tagIdx} className="info-tag monospace">
              {tag}
            </span>
          ))}
        </div>

        {/* Call to Actions Footer */}
        <div className="info-footer">
          {project.id === 'you-can-only' ? (
            <div className="appstore-badge-group">
              <a 
                href="https://apps.apple.com/it/app/youcanonly/id6755528500" 
                target="_blank" 
                rel="noopener noreferrer"
                className="appstore-link"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src="/AppStore-Badge.svg" 
                  alt="Download on the App Store" 
                  className="appstore-badge-img" 
                />
              </a>
              <button onClick={handleModalClick} className="btn-card-primary" style={{ '--accent-color': project.accentColor } as React.CSSProperties}>
                <BookOpen size={14} />
                <span>{t.work.readStory}</span>
              </button>
            </div>
          ) : (
            <div className="badge-cta-group">
              <button onClick={handleModalClick} className="btn-card-primary" style={{ '--accent-color': project.accentColor } as React.CSSProperties}>
                <BookOpen size={14} />
                <span>{t.work.readStory}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .project-card-v2 {
          display: flex;
          flex-direction: column;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
          cursor: pointer;
          height: 100%;
        }

        .project-card-v2:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-medium);
          transform: translateY(-4px);
        }

        .card-visual-frame {
          width: 100%;
          position: relative;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-subtle);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-year-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(5, 5, 7, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 0.25rem 0.6rem;
          font-size: 0.75rem;
          border-radius: 4px;
          z-index: 5;
        }

        [data-theme="light"] .card-year-badge {
          background: #050507;
          color: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.2);
        }

        .card-info-pane {
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          text-align: left;
        }

        .info-meta-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .meta-category {
          font-weight: 700;
        }

        .info-title-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .info-app-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          object-fit: cover;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          flex-shrink: 0;
          border: 1px solid var(--border-subtle);
        }

        .title-stack {
          display: flex;
          flex-direction: column;
        }

        .info-title {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.2;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .info-subtitle {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .info-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.75rem;
          flex-grow: 1;
        }

        .info-tags-grid {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .info-tag {
          font-size: 0.725rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
        }

        .info-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.5rem;
          margin-top: auto;
          width: 100%;
        }

        .appstore-badge-group {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          align-items: center;
          width: 100%;
          gap: 0.75rem;
        }

        .appstore-badge-group .btn-card-primary {
          padding: 0.6rem 0.75rem;
          font-size: 0.8125rem;
        }

        .appstore-link {
          display: block;
          transition: transform 0.25s ease;
        }

        .appstore-link:hover {
          transform: scale(1.03);
        }

        .appstore-badge-img {
          height: 38px;
          display: block;
        }

        .badge-cta-group {
          display: flex;
          width: 100%;
        }

        .btn-card-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 600;
          background: var(--text-primary);
          color: var(--text-inverse);
          transition: all 0.3s ease;
          width: 100%;
          justify-content: center;
        }

        .btn-card-primary:hover {
          background: var(--accent-color, var(--accent-primary));
          color: #ffffff;
        }

        .btn-card-text {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.775rem;
          font-weight: 700;
          color: var(--text-secondary);
          transition: color 0.3s ease;
        }

        .btn-card-text:hover {
          color: var(--text-primary);
        }

        @media (max-width: 480px) {
          .card-visual-frame {
            padding: 1rem;
          }
          .card-info-pane {
            padding: 1.5rem 1.25rem;
          }
          .appstore-badge-group {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .btn-card-text {
            width: 100%;
            justify-content: flex-start;
            padding: 0.5rem 0;
          }
        }
      `}</style>
    </div>
  );
};
