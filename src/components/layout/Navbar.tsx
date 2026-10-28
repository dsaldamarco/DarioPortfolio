import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PROFILE } from '../../data/projects';
import { useLanguage } from '../../i18n/LanguageContext';
import { onLinkClick } from '../../lib/router';
import './navbar.css';

export const Navbar: React.FC<{ onHome: boolean }> = ({ onHome }) => {
  const { language, setLanguage, t } = useLanguage();
  const section = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const follow = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onHome) onLinkClick(e);
  };

  return (
    <header className="bar">
      <div className="wrap bar-row">
        <a href={onHome ? '#top' : '/'} className="bar-brand" aria-label={t.nav.home} onClick={follow}>
          <img src="/favicon.png" alt="" width="32" height="32" />
          <span>Dario Saldamarco</span>
        </a>

        {!onHome && (
          <a className="bar-back" href="/#work" onClick={(e) => onLinkClick(e)}>
            <ArrowLeft size={18} aria-hidden /> {t.cs.back}
          </a>
        )}

        <nav className="bar-nav" aria-label={language === 'it' ? 'Sezioni' : 'Sections'}>
          <ul>
            <li><a href={section('work')} onClick={follow}>{t.nav.work}</a></li>
            <li><a href={section('method')} onClick={follow}>{t.nav.method}</a></li>
            <li><a href={section('about')} onClick={follow}>{t.nav.about}</a></li>
            <li><a href={section('cv')} onClick={follow}>{t.nav.cv}</a></li>
            <li><a href={PROFILE.cv[language]} target="_blank" rel="noopener">{t.nav.resume}</a></li>
          </ul>
        </nav>

        <div className="bar-actions">
          <div className="lang" role="group" aria-label={t.nav.lang}>
            {(['it', 'en'] as const).map((code) => (
              <button
                key={code}
                type="button"
                lang={code}
                aria-pressed={language === code}
                aria-label={code === 'it' ? 'Italiano' : 'English'}
                onClick={() => setLanguage(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="btn bar-cta" href={`mailto:${PROFILE.links.email}`}>
            {t.nav.contact}
          </a>
        </div>
      </div>
    </header>
  );
};
