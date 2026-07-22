import React, { useState, useEffect } from 'react';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onContactClick }) => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['about', 'projects', 'experience', 'education', 'skills'];
      const scrollPos = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-wrapper">
      <div className={`navbar-dock glass-dock ${scrolled ? 'scrolled' : ''}`}>
        {/* Brand with Avatar Icon */}
        <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="nav-brand">
          <img src="/dario-icon.png" alt="Dario Saldamarco" className="brand-avatar-img" />
          <span className="brand-name">Dario Saldamarco</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links desktop-only">
          <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>
            {t.nav.about}
          </a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }} className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>
            {t.nav.work}
          </a>
          <a href="#experience" onClick={(e) => { e.preventDefault(); handleNavClick('experience'); }} className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}>
            {t.nav.experience}
          </a>
          <a href="#education" onClick={(e) => { e.preventDefault(); handleNavClick('education'); }} className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}>
            {t.nav.education}
          </a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }} className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>
            {t.nav.skills}
          </a>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Language Switcher: Always visible */}
          <div className="lang-switcher">
            <Globe size={13} className="lang-globe-icon" />
            <button 
              className={`lang-btn ${language === 'it' ? 'active' : ''}`} 
              onClick={() => setLanguage('it')}
            >
              IT
            </button>
            <span className="lang-divider">/</span>
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`} 
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="icon-button" 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Desktop Contact CTA */}
          <button onClick={() => { setMobileMenuOpen(false); onContactClick(); }} className="cta-button-sm desktop-only">
            <span>{t.nav.contact}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button 
            className="mobile-toggle icon-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer glass-dock">
          <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="mobile-link">
            {t.nav.about}
          </a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }} className="mobile-link">
            {t.nav.work}
          </a>
          <a href="#experience" onClick={(e) => { e.preventDefault(); handleNavClick('experience'); }} className="mobile-link">
            {t.nav.experience}
          </a>
          <a href="#education" onClick={(e) => { e.preventDefault(); handleNavClick('education'); }} className="mobile-link">
            {t.nav.education}
          </a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }} className="mobile-link">
            {t.nav.skills}
          </a>
          <button onClick={() => { setMobileMenuOpen(false); onContactClick(); }} className="mobile-cta-btn">
            {t.nav.contact}
          </button>
        </div>
      )}

      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 1rem;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 1rem;
          pointer-events: none;
          width: 100%;
          box-sizing: border-box;
        }

        .navbar-dock {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.6rem 1.25rem;
          border-radius: var(--radius-full);
          width: 100%;
          max-width: var(--max-width);
          transition: all var(--transition-normal);
          box-sizing: border-box;
        }

        .navbar-dock.scrolled {
          box-shadow: var(--shadow-lg);
          border-color: var(--border-medium);
          background: var(--bg-glass-heavy);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .brand-avatar-img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .brand-name {
          letter-spacing: -0.02em;
          white-space: nowrap;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.1rem;
        }

        .nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.06);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .lang-switcher {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .lang-globe-icon {
          color: var(--text-tertiary);
          margin-right: 0.1rem;
        }

        .lang-btn {
          color: var(--text-tertiary);
          transition: color var(--transition-fast);
        }

        .lang-btn.active {
          color: var(--text-primary);
          font-weight: 700;
        }

        .lang-divider {
          color: var(--border-medium);
          font-size: 0.7rem;
        }

        .icon-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .icon-button:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.08);
        }

        .cta-button-sm {
          display: flex;
          align-items: center;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.8125rem;
          font-weight: 600;
          background: var(--text-primary);
          color: var(--text-inverse);
          transition: transform var(--transition-fast), opacity var(--transition-fast);
        }

        .cta-button-sm:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }

        .mobile-toggle {
          display: none;
        }

        .mobile-menu-drawer {
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          width: 100%;
          max-width: var(--max-width);
          margin-top: 0.5rem;
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-lg);
          background: var(--bg-glass-heavy);
          box-shadow: var(--shadow-lg);
          animation: slideDown 0.25s var(--ease-editorial);
          box-sizing: border-box;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-link {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-subtle);
          text-align: left;
        }

        .mobile-cta-btn {
          margin-top: 0.5rem;
          padding: 0.75rem;
          border-radius: var(--radius-full);
          background: var(--text-primary);
          color: var(--text-inverse);
          font-weight: 600;
          text-align: center;
        }

        @media (max-width: 860px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-toggle {
            display: flex;
          }
          .navbar-dock {
            padding: 0.5rem 0.85rem;
          }
          .brand-name {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </header>
  );
};
