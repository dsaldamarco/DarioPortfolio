import React from 'react';
import { Mail, Copy, ArrowUp, Globe } from 'lucide-react';
import { PROFILE } from '../../data/projects';
import { useLanguage } from '../../i18n/LanguageContext';

interface FooterProps {
  onCopyEmail: () => void;
}

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
              <Globe size={18} />
            </a>
            <a href={PROFILE.links.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <Globe size={18} />
            </a>
            <a href={PROFILE.links.dribbble} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Dribbble">
              <Globe size={18} />
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
