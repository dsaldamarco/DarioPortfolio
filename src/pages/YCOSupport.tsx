import React from 'react';
import { ArrowLeft, Mail, HelpCircle, Bug, Sparkles } from 'lucide-react';
import { PROFILE } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';

export const YCOSupport: React.FC = () => {
  const { language } = useLanguage();

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="yco-page-shell">
      {/* Ambient background */}
      <div className="ambient-bg">
        <div className="ambient-glow-1"></div>
        <div className="ambient-glow-2"></div>
      </div>

      {/* Top Navbar */}
      <header className="yco-header">
        <div className="container yco-nav-container">
          <button onClick={handleBackToHome} className="back-link-btn">
            <ArrowLeft size={16} />
            <span>{language === 'it' ? 'Torna al Portfolio' : 'Back to Portfolio'}</span>
          </button>

          <a href="/you-can-only/privacy" className="nav-secondary-link">
            {language === 'it' ? 'Privacy Policy' : 'Privacy Policy'}
          </a>
        </div>
      </header>

      {/* Main Support Page Content */}
      <main className="yco-content container">
        {/* App Identity Banner */}
        <div className="yco-brand-hero">
          <img 
            src="/projects/you-can-only/appicon-youcanonly.png" 
            alt="You Can Only App Icon" 
            className="yco-app-icon"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="yco-hero-titles">
            <span className="yco-tag">Official App Store Support</span>
            <h1 className="yco-page-title">You Can Only Support</h1>
            <p className="yco-page-subtitle">
              Need help, found a bug, or want to share feedback?
            </p>
          </div>
        </div>

        {/* About App Section */}
        <section className="yco-section glass-panel">
          <div className="section-head">
            <Sparkles size={20} color="#f05123" />
            <h2>About You Can Only</h2>
          </div>
          <p className="yco-body-text">
            You Can Only is a fast-paced arcade game where every challenge gives you only one possible action. Tap, swipe, hold, adapt, and push your limits.
          </p>
        </section>

        {/* Contact Support Section */}
        <section className="yco-section glass-panel">
          <div className="section-head">
            <Mail size={20} color="#f05123" />
            <h2>Contact Support</h2>
          </div>
          <p className="yco-body-text">
            For questions, feedback, or bug reports, please feel free to get in touch directly:
          </p>
          <div className="support-email-card">
            <Mail size={18} />
            <a href={`mailto:${PROFILE.links.email}`} className="email-link">
              {PROFILE.links.email}
            </a>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="yco-section glass-panel">
          <div className="section-head">
            <HelpCircle size={20} color="#f05123" />
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            <div className="faq-item">
              <h3 className="faq-q">Q: Is You Can Only an online game?</h3>
              <p className="faq-a">A: No. You Can Only is designed to work offline and does not require an account.</p>
            </div>

            <div className="faq-item">
              <h3 className="faq-q">Q: Why do I fail so often?</h3>
              <p className="faq-a">A: Failure is part of the gameplay. Each attempt helps you learn the mechanics and improve your skills.</p>
            </div>

            <div className="faq-item">
              <h3 className="faq-q">Q: Will there be new content?</h3>
              <p className="faq-a">A: Yes. The game will continue to receive updates with new challenges, features, and improvements.</p>
            </div>
          </div>
        </section>

        {/* Feedback & Bug Reports */}
        <section className="yco-section glass-panel">
          <div className="section-head">
            <Bug size={20} color="#f05123" />
            <h2>Feedback & Bug Reports</h2>
          </div>
          <p className="yco-body-text">
            Your feedback helps improve You Can Only! If you encounter a bug or have suggestions for new mechanics or updates, please send an email with your device model and iOS version details to help us investigate quickly.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="yco-footer">
        <div className="container yco-footer-container">
          <span>© {new Date().getFullYear()} You Can Only — Designed & Developed by Dario Saldamarco. All rights reserved.</span>
          <div className="footer-links">
            <a href="/you-can-only/support">Support</a>
            <span>•</span>
            <a href="/you-can-only/privacy">Privacy Policy</a>
          </div>
        </div>
      </footer>

      <style>{`
        .yco-page-shell {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .yco-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--bg-glass-heavy);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          padding: 1.25rem 0;
        }

        .yco-nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .back-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .back-link-btn:hover {
          color: var(--text-primary);
        }

        .nav-secondary-link {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-tertiary);
          transition: color var(--transition-fast);
        }

        .nav-secondary-link:hover {
          color: var(--text-primary);
        }

        .yco-content {
          padding-top: 3.5rem;
          padding-bottom: 5rem;
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
          max-width: 840px;
          margin: 0 auto;
        }

        .yco-brand-hero {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          margin-bottom: 1rem;
        }

        .yco-app-icon {
          width: 96px;
          height: 96px;
          border-radius: 22px;
          object-fit: cover;
          box-shadow: 0 12px 35px rgba(240, 81, 35, 0.25);
          flex-shrink: 0;
        }

        .yco-hero-titles {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .yco-tag {
          font-size: 0.8rem;
          font-weight: 700;
          color: #f05123;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .yco-page-title {
          font-size: clamp(2.2rem, 4.5vw, 3.25rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .yco-page-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
        }

        .yco-section {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.03);
        }

        .section-head {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .section-head h2 {
          font-size: 1.45rem;
          font-weight: 700;
        }

        .yco-body-text {
          font-size: 1.08rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        .support-email-card {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.35rem;
          border-radius: var(--radius-md);
          background: rgba(240, 81, 35, 0.08);
          color: #f05123;
          font-weight: 600;
          font-size: 1.05rem;
          width: fit-content;
        }

        .email-link {
          color: inherit;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }

        .faq-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .faq-q {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .faq-a {
          font-size: 1.025rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .yco-footer {
          margin-top: auto;
          padding: 2.5rem 0;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.875rem;
          color: var(--text-tertiary);
        }

        .yco-footer-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        @media (max-width: 640px) {
          .yco-brand-hero {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .yco-hero-titles {
            align-items: center;
          }
          .yco-section {
            padding: 1.5rem 1.25rem;
          }
          .yco-footer-container {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};
