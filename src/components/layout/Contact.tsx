import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../../data/projects';
import { useLanguage } from '../../i18n/LanguageContext';
import './contact.css';

const ELSEWHERE = [
  { label: 'LinkedIn', href: PROFILE.links.linkedin },
  { label: 'Dribbble', href: PROFILE.links.dribbble },
  { label: 'GitHub', href: PROFILE.links.github },
];

export const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.links.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${PROFILE.links.email}`;
    }
  };

  return (
    <footer id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-main">
            <h2 id="contact-title" className="section-title">{t.contact.title}</h2>
            <p className="lead">{t.contact.intro}</p>
            <a className="contact-email" href={`mailto:${PROFILE.links.email}`}>
              {PROFILE.links.email}
            </a>
            <button type="button" className="btn btn--on-night contact-copy" onClick={copy}>
              {copied ? t.contact.copied : t.contact.copy}
            </button>
            <span className="sr-only" role="status">{copied ? t.contact.copied : ''}</span>
          </div>

          <div className="contact-else">
            <h3 className="small">{t.contact.elsewhere}</h3>
            <ul>
              <li>
                <a href={PROFILE.cv[language]} target="_blank" rel="noopener">
                  {t.contact.resume} <ArrowUpRight size={20} aria-hidden />
                </a>
              </li>
              {ELSEWHERE.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} <ArrowUpRight size={20} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="contact-imprint small">
          <span>© {new Date().getFullYear()} · {t.contact.rights}</span>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }}>
            {t.contact.top} <ArrowUp size={16} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
};
