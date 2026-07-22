import React, { useEffect, useState } from 'react';
import { X, ArrowLeft, CheckCircle2, Calendar, Sparkles, HelpCircle, ShieldCheck, BookOpen, ArrowRight } from 'lucide-react';
import { type Project } from '../../data/projects';
import { useLanguage } from '../../i18n/LanguageContext';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const { language, t } = useLanguage();
  const [iconError, setIconError] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIconError(false);
    setFailedImages({});

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;
  const description = language === 'it' ? project.description.it : project.description.en;
  const subtitle = language === 'it' ? project.subtitle.it : project.subtitle.en;
  const overview = language === 'it' ? caseStudy.overview.it : caseStudy.overview.en;
  const problem = language === 'it' ? caseStudy.problem.it : caseStudy.problem.en;
  const solution = language === 'it' ? caseStudy.solution.it : caseStudy.solution.en;

  const handleImageError = (imgSrc: string) => {
    setFailedImages((prev) => ({ ...prev, [imgSrc]: true }));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Top Header Dock */}
        <div className="modal-header">
          <button onClick={onClose} className="back-btn">
            <ArrowLeft size={16} />
            <span>{t.modal.back}</span>
          </button>

          <button onClick={onClose} className="close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="modal-body">
          {/* Identity Hero Stack */}
          <div className="case-hero">
            <span className="case-subtitle-top" style={{ color: project.accentColor }}>
              {subtitle}
            </span>

            <div className="case-title-row">
              {!iconError ? (
                <img 
                  src={project.appIcon} 
                  alt={`${project.title} App Icon`} 
                  className="modal-big-app-icon"
                  onError={() => setIconError(true)}
                />
              ) : (
                <div className="modal-big-icon-fallback" style={{ background: project.accentColor }}>
                  <Sparkles size={34} color="#ffffff" />
                </div>
              )}

              <h1 className="case-title-big">{project.title}</h1>
            </div>

            <div className="modal-roles-row">
              {project.role.map((r, idx) => (
                <span key={idx} className="modal-role-badge">{r}</span>
              ))}
              <span className="modal-year-badge"><Calendar size={13} /> {project.year}</span>
            </div>

            {/* Dedicated Page Links / CTAs */}
            {project.id === 'you-can-only' && (
              <div className="appstore-links-row">
                <a href="/you-can-only/support" className="appstore-link-btn">
                  <HelpCircle size={14} />
                  <span>Support Page</span>
                </a>
                <a href="/you-can-only/privacy" className="appstore-link-btn">
                  <ShieldCheck size={14} />
                  <span>Privacy Policy</span>
                </a>
              </div>
            )}

            {project.id === 'orbys-adventure' && (
              <div className="appstore-links-row">
                <a href="/projects/orbys-adventure" className="featured-full-cs-cta">
                  <Sparkles size={16} />
                  <span>{language === 'it' ? 'Esplora il Case Study UX Completo' : 'Explore Full UX Case Study'}</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            )}
          </div>

          {/* Project Intro Description */}
          <div className="case-intro-card">
            <p className="intro-text">{description}</p>
          </div>

          {/* Uncropped Full Visual Screenshot Gallery */}
          <div className="media-gallery-section">
            <div className="media-uncropped-gallery">
              {project.images.map((imgSrc, idx) => (
                !failedImages[imgSrc] && (
                  <div key={idx} className="screenshot-card">
                    <img 
                      src={imgSrc} 
                      alt={`${project.title} screenshot ${idx + 1}`} 
                      className="uncropped-screenshot-img"
                      onError={() => handleImageError(imgSrc)}
                    />
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Project Overview */}
          <div className="case-section">
            <h2>{t.modal.overview}</h2>
            <p className="section-paragraph">{overview}</p>
          </div>

          {/* Challenge & Solution */}
          <div className="case-section grid-two">
            <div className="card-box problem-box">
              <h3>{t.modal.challenge}</h3>
              <p>{problem}</p>
            </div>
            <div className="card-box solution-box">
              <h3>{t.modal.solution}</h3>
              <p>{solution}</p>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="case-section">
            <h2>{t.modal.focusAreas}</h2>
            <div className="focus-list">
              {project.focus.map((item, idx) => (
                <div key={idx} className="focus-item">
                  <CheckCircle2 size={16} color={project.accentColor} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Prominent CTA Banner for Orby's Adventure */}
          {project.id === 'orbys-adventure' && (
            <div className="modal-bottom-cta-banner">
              <div className="cta-banner-text">
                <h3>{language === 'it' ? 'Vuoi scoprire l’intero processo di UX Design?' : 'Want to explore the complete UX process?'}</h3>
                <p>{language === 'it' ? 'Leggi il Case Study di Product Design con l’analisi dati, la ricerca utenti sul campo a Pune (India) e tutte le iterazioni di gioco.' : 'Read the complete 15-section Product Design Case Study featuring quantitative data analysis, Pune field research, and game design iterations.'}</p>
              </div>
              <a href="/projects/orbys-adventure" className="featured-full-cs-cta big">
                <BookOpen size={18} />
                <span>{language === 'it' ? 'Leggi il Case Study Completo' : 'Read Full Case Study'}</span>
                <ArrowRight size={18} />
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .modal-container {
          width: 100%;
          max-width: 1140px;
          max-height: 92vh;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: var(--bg-secondary);
          border: none;
          box-shadow: var(--shadow-lg);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 2.25rem;
          border-bottom: none;
          background: var(--bg-glass-heavy);
        }

        .back-btn, .close-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          transition: color var(--transition-fast);
        }

        .back-btn:hover, .close-btn:hover {
          color: var(--text-primary);
        }

        .modal-body {
          overflow-y: auto;
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .case-hero {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.65rem;
          text-align: left;
        }

        .case-subtitle-top {
          font-size: 0.9375rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .case-title-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
        }

        .modal-big-app-icon {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          object-fit: cover;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
          border: none;
          flex-shrink: 0;
          display: block;
        }

        .modal-big-icon-fallback {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
          border: none;
          flex-shrink: 0;
        }

        .case-title-big {
          font-size: clamp(2.5rem, 5vw, 3.85rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--text-primary);
        }

        .modal-roles-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }

        .modal-role-badge {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          border: none;
        }

        .modal-year-badge {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .appstore-links-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.75rem;
          flex-wrap: wrap;
        }

        .appstore-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          background: rgba(240, 81, 35, 0.12);
          color: #f05123;
          font-size: 0.8125rem;
          font-weight: 600;
          transition: transform var(--transition-fast);
        }

        .featured-full-cs-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.4rem;
          border-radius: var(--radius-full);
          background: #10b981;
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.35);
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          cursor: pointer;
        }

        .featured-full-cs-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(16, 185, 129, 0.5);
          color: #ffffff;
        }

        .featured-full-cs-cta.big {
          padding: 0.9rem 1.8rem;
          font-size: 1.05rem;
        }

        .modal-bottom-cta-banner {
          margin-top: 1rem;
          padding: 2.25rem;
          border-radius: var(--radius-xl);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%);
          border: 1px solid rgba(16, 185, 129, 0.25);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.75rem;
          flex-wrap: wrap;
        }

        .cta-banner-text {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          max-width: 620px;
        }

        .cta-banner-text h3 {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .cta-banner-text p {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .case-intro-card {
          padding: 1.5rem 1.75rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          border: none;
        }

        .intro-text {
          font-size: 1.15rem;
          line-height: 1.65;
          color: var(--text-primary);
          font-weight: 500;
        }

        /* Gallery */
        .media-gallery-section {
          width: 100%;
        }

        .media-uncropped-gallery {
          display: flex;
          flex-wrap: wrap;
          gap: 1.75rem;
          justify-content: center;
          align-items: flex-start;
        }

        .screenshot-card {
          flex: 1 1 320px;
          max-width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .uncropped-screenshot-img {
          width: 100%;
          max-width: 100%;
          height: auto;
          max-height: 650px;
          object-fit: contain;
          border-radius: var(--radius-md);
          border: none;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.45);
          display: block;
        }

        .case-section h2 {
          font-size: 1.75rem;
          margin-bottom: 0.85rem;
        }

        .section-paragraph {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .grid-two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem;
        }

        .card-box {
          padding: 1.85rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          border: none;
        }

        .card-box h3 {
          font-size: 1.25rem;
          margin-bottom: 0.65rem;
        }

        .focus-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
        }

        .focus-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.1rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.04);
          border: none;
          font-size: 0.9rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .grid-two {
            grid-template-columns: 1fr;
          }
          .modal-backdrop {
            padding: 0.75rem;
          }
          .modal-body {
            padding: 1.75rem 1.25rem;
          }
          .case-hero {
            align-items: center;
            text-align: center;
          }
          .case-title-row {
            justify-content: center;
          }
          .modal-roles-row {
            justify-content: center;
          }
          .appstore-links-row {
            justify-content: center;
          }
          .modal-big-app-icon, .modal-big-icon-fallback {
            width: 64px;
            height: 64px;
            border-radius: 16px;
          }
          .case-title-big {
            font-size: 2.2rem;
            text-align: center;
          }
          .modal-bottom-cta-banner {
            padding: 1.5rem 1.25rem;
            flex-direction: column;
            text-align: center;
          }
          .cta-banner-text {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};
