import React from 'react';
import { Mail, Copy, ArrowUp } from 'lucide-react';
import { PROFILE } from '../../data/projects';
import { useLanguage } from '../../i18n/LanguageContext';

interface FooterProps {
  onCopyEmail: () => void;
}

const GithubIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const DribbbleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onCopyEmail }) => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="footer-section">
      <div className="container">
        {/* Main CTA Box */}
        <div className="footer-hero glass-panel">
          <h2 className="footer-title">{t.contact.title}</h2>
          <p className="footer-subtitle">{t.contact.subtitle}</p>

          <div className="cta-actions">
            <a href={`mailto:${PROFILE.links.email}`} className="btn-email-primary">
              <Mail size={16} />
              <span>{PROFILE.links.email}</span>
            </a>

            <button onClick={onCopyEmail} className="btn-copy-email">
              <Copy size={16} />
              <span>{t.contact.copyEmail}</span>
            </button>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-left">
            <span className="copyright">
              © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
            </span>
          </div>

          <div className="social-links">
            <a href={PROFILE.links.github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href={PROFILE.links.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href={PROFILE.links.dribbble} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Dribbble">
              <DribbbleIcon />
            </a>
          </div>

          <button onClick={scrollToTop} className="back-top-btn" title="Back to top" aria-label="Back to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .footer-section {
          padding-top: 4rem;
          padding-bottom: 3rem;
          width: 100%;
          box-sizing: border-box;
        }

        .footer-hero {
          padding: 4.5rem 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          margin-bottom: 4rem;
          width: 100%;
          box-sizing: border-box;
        }

        .footer-title {
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .footer-subtitle {
          max-width: 620px;
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .cta-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-email-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 1.85rem;
          border-radius: var(--radius-full);
          font-size: 0.95rem;
          font-weight: 600;
          background: var(--text-primary);
          color: var(--text-inverse);
          transition: transform var(--transition-fast), opacity var(--transition-fast);
        }

        .btn-email-primary:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .btn-copy-email {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 1.85rem;
          border-radius: var(--radius-full);
          font-size: 0.95rem;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .btn-copy-email:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid var(--border-subtle);
          gap: 1.5rem;
          width: 100%;
        }

        .copyright {
          font-size: 0.875rem;
          color: var(--text-tertiary);
        }

        .social-links {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .social-icon {
          color: var(--text-secondary);
          transition: color var(--transition-fast), transform var(--transition-fast);
        }

        .social-icon:hover {
          color: var(--text-primary);
          transform: translateY(-2px);
        }

        .back-top-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .back-top-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-medium);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .footer-hero {
            padding: 2.5rem 1.25rem;
          }
          .cta-actions {
            flex-direction: column;
            width: 100%;
          }
          .btn-email-primary, .btn-copy-email {
            width: 100%;
            justify-content: center;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.25rem;
          }
        }
      `}</style>
    </footer>
  );
};
