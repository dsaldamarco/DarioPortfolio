import React from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2, Lock, Smartphone } from 'lucide-react';
import { PROFILE } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';

export const YCOPrivacy: React.FC = () => {
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

          <a href="/you-can-only/support" className="nav-secondary-link">
            {language === 'it' ? 'Supporto' : 'Support'}
          </a>
        </div>
      </header>

      {/* Main Privacy Page Content */}
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
            <span className="yco-tag">Official Privacy Policy</span>
            <h1 className="yco-page-title">Privacy Policy</h1>
            <p className="yco-page-subtitle">
              You Can Only respects your privacy. Zero data collection by design.
            </p>
          </div>
        </div>

        {/* Overview Box */}
        <section className="yco-section glass-panel highlight-box">
          <div className="section-head">
            <ShieldCheck size={22} color="#10b981" />
            <h2>Zero Data Collection Policy</h2>
          </div>
          <p className="yco-body-text">
            <strong>You Can Only does not collect, store, or share any personal data.</strong> The application is designed to function completely offline without requiring any user registration or data transmission.
          </p>
        </section>

        {/* Core Principles */}
        <section className="yco-section glass-panel">
          <div className="section-head">
            <Lock size={20} color="#f05123" />
            <h2>Privacy Standards</h2>
          </div>

          <ul className="privacy-list">
            <li className="privacy-item">
              <CheckCircle2 size={18} color="#10b981" />
              <span><strong>No Account Needed:</strong> The app does not require account creation and works entirely offline.</span>
            </li>

            <li className="privacy-item">
              <CheckCircle2 size={18} color="#10b981" />
              <span><strong>No Personal Information Collected:</strong> No names, email addresses, location data, or device identifiers are collected from users.</span>
            </li>

            <li className="privacy-item">
              <CheckCircle2 size={18} color="#10b981" />
              <span><strong>No Data Shared:</strong> No data is shared with third parties, advertisers, or external servers.</span>
            </li>

            <li className="privacy-item">
              <CheckCircle2 size={18} color="#10b981" />
              <span><strong>No Tracking Technologies:</strong> No cookies, pixels, or user tracking technologies are used.</span>
            </li>

            <li className="privacy-item">
              <CheckCircle2 size={18} color="#10b981" />
              <span><strong>No Third-Party Analytics:</strong> No external analytics services or telemetry SDKs are integrated.</span>
            </li>
          </ul>
        </section>

        {/* Storage section */}
        <section className="yco-section glass-panel">
          <div className="section-head">
            <Smartphone size={20} color="#f05123" />
            <h2>Local Device Storage</h2>
          </div>
          <p className="yco-body-text">
            The app only stores local game progress, high scores, and audio/control settings locally on the user's device via standard iOS storage mechanisms. This data never leaves your device and can be cleared at any time by uninstalling the application.
          </p>
        </section>

        {/* Contact Section */}
        <section className="yco-section glass-panel">
          <h2>Questions & Information</h2>
          <p className="yco-body-text">
            If you have any questions regarding this Privacy Policy or You Can Only, please reach out via email at:
          </p>
          <a href={`mailto:${PROFILE.links.email}`} className="email-highlight-link">
            {PROFILE.links.email}
          </a>
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
          color: #10b981;
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

        .highlight-box {
          background: rgba(16, 185, 129, 0.04);
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

        .privacy-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          list-style: none;
          padding: 0;
          margin-top: 0.5rem;
        }

        .privacy-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .privacy-item strong {
          color: var(--text-primary);
        }

        .email-highlight-link {
          font-size: 1.05rem;
          font-weight: 600;
          color: #f05123;
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
