import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PROJECTS, getProject, type Shot } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';
import { onLinkClick } from '../lib/router';
import { useReveal } from '../lib/useReveal';
import { AppIcon } from '../components/ui/AppIcon';
import { Contact } from '../components/layout/Contact';
import './case-study.css';

const reveal = (i = 0) => ({ 'data-reveal': '', style: { '--i': i } as React.CSSProperties });

const Row: React.FC<{ title: string; id: string; children: React.ReactNode; wide?: boolean }> = ({ title, id, children, wide }) => (
  <section className={`cs-row ${wide ? 'cs-row--wide' : ''}`} aria-labelledby={id}>
    <h2 id={id} className="cs-row-title" {...reveal(0)}>{title}</h2>
    <div className="cs-row-body" {...reveal(1)}>{children}</div>
  </section>
);

const Picture: React.FC<{ shot: Shot; lang: 'it' | 'en'; eager?: boolean }> = ({ shot, lang, eager }) => (
  <img
    src={shot.src}
    alt={shot.alt[lang]}
    width={shot.w}
    height={shot.h}
    loading={eager ? 'eager' : 'lazy'}
    decoding="async"
    className={`shot shot--${shot.kind}`}
  />
);

export const CaseStudyPage: React.FC<{ id: string }> = ({ id }) => {
  const { t, language } = useLanguage();
  const p = getProject(id);
  useReveal([id, language]);

  useEffect(() => {
    document.title = p ? `${p.title} — Dario Saldamarco` : 'Dario Saldamarco';
    return () => {
      document.title = 'Dario Saldamarco — UX/UI designer';
    };
  }, [p, language]);

  if (!p) {
    return (
      <main id="main" className="wrap cs-missing">
        <h1 className="section-title">{t.cs.notFound}</h1>
        <a className="btn" href="/" onClick={(e) => onLinkClick(e)}>
          <ArrowLeft size={18} aria-hidden /> {t.cs.back}
        </a>
      </main>
    );
  }

  const next = PROJECTS[(PROJECTS.findIndex((x) => x.id === p.id) + 1) % PROJECTS.length];
  const isTablet = p.gallery[0].kind === 'tablet';
  const cover = isTablet ? p.gallery[0] : null;
  const rest = p.gallery.slice(isTablet ? 1 : 3);

  return (
    <>
      <main id="main" className="cs">
        <div className="wrap">
          <header className="cs-head">
            <AppIcon src={p.icon} inset={p.iconInset} size="clamp(88px, 10vw, 136px)" eager style={{ viewTransitionName: 'launch-icon' }} />
            <div className="cs-head-text">
              <h1 className="cs-title">{p.title}</h1>
              <p className="muted">{p.kind[language]} · {p.year}</p>
            </div>
            <p className="lead cs-summary" {...reveal(1)}>{p.summary[language]}</p>
          </header>

          <dl className="cs-facts" {...reveal(2)}>
            {p.facts.map((f) => (
              <div key={f.label.en}>
                <dt>{f.label[language]}</dt>
                <dd>{f.value[language]}</dd>
              </div>
            ))}
          </dl>

          {p.links && (
            <div className="cs-links" {...reveal(3)}>
              {p.links.appStore && (
                <a className="appstore" href={p.links.appStore} target="_blank" rel="noopener noreferrer">
                  <img src="/AppStore-Badge.svg" alt={language === 'it' ? 'Scarica sull’App Store' : 'Download on the App Store'} width="135" height="40" />
                </a>
              )}
              {p.links.support && <a className="text-link" href={p.links.support}>{t.cs.support}</a>}
              {p.links.privacy && <a className="text-link" href={p.links.privacy}>{t.cs.privacy}</a>}
            </div>
          )}

          <figure className={`cs-cover ${cover ? '' : 'cs-cover--phones'}`} {...reveal(1)}>
            {cover ? (
              <Picture shot={cover} lang={language} eager />
            ) : (
              p.gallery.slice(0, 3).map((s, i) => <Picture key={s.src} shot={s} lang={language} eager={i === 0} />)
            )}
          </figure>

          {p.context && (
            <Row title={t.cs.context} id="cs-context">
              <p className="lead">{p.context[language]}</p>
            </Row>
          )}

          <Row title={t.cs.problem} id="cs-problem">
            <p className="lead">{p.problem[language]}</p>
            {p.evidence && (
              <dl className="cs-evidence">
                {p.evidence.map((e) => (
                  <div key={e.figure}>
                    <dt>{e.figure}</dt>
                    <dd className="small">{e.label[language]}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Row>

          <Row title={t.cs.role} id="cs-role">
            <ul className="cs-role">
              {p.role.map((r) => (
                <li key={r.en}>{r[language]}</li>
              ))}
            </ul>
          </Row>

          {p.process && (
            <Row title={t.cs.process} id="cs-process">
              <ol className="cs-process">
                {p.process.map((step) => (
                  <li key={step.title.en}>
                    <h3>{step.title[language]}</h3>
                    <p className="small">{step.body[language]}</p>
                  </li>
                ))}
              </ol>
            </Row>
          )}

          <Row title={t.cs.decisions} id="cs-decisions">
            <div className="cs-decisions">
              {p.decisions.map((d) => (
                <div key={d.title.en}>
                  <h3>{d.title[language]}</h3>
                  <p>{d.body[language]}</p>
                </div>
              ))}
            </div>
          </Row>

          {p.beforeAfter && (
            <Row title={t.cs.beforeAfter} id="cs-before-after" wide>
              <div className="cs-pair">
                <figure>
                  <img src={p.beforeAfter.before.src} alt={p.beforeAfter.before.alt[language]} width="1600" height="1066" loading="lazy" decoding="async" className="cs-photo" />
                </figure>
                <figure className="cs-pair-after">
                  <Picture shot={p.beforeAfter.after} lang={language} />
                </figure>
              </div>
              <p className="cs-note">{p.beforeAfter.note[language]}</p>
            </Row>
          )}

          {p.research && (
            <Row title={t.cs.research} id="cs-research" wide>
              <p className="lead cs-note">{p.research.intro[language]}</p>
              <div className="cs-photos">
                {p.research.photos.map((s) => (
                  <figure key={s.src}>
                    <img src={s.src} alt={s.alt[language]} width={s.w} height={s.h} loading="lazy" decoding="async" className="cs-photo" />
                    {s.caption && <figcaption className="small muted">{s.caption[language]}</figcaption>}
                  </figure>
                ))}
              </div>
            </Row>
          )}

          {p.outcome && (
            <Row title={t.cs.outcome} id="cs-outcome">
              <p className="lead">{p.outcome[language]}</p>
            </Row>
          )}

          {p.learnings && (
            <Row title={t.cs.learnings} id="cs-learnings">
              <div className="cs-decisions">
                {p.learnings.map((d) => (
                  <div key={d.title.en}>
                    <h3>{d.title[language]}</h3>
                    <p>{d.body[language]}</p>
                  </div>
                ))}
              </div>
            </Row>
          )}

          {rest.length > 0 && (
            <Row title={t.cs.gallery} id="cs-gallery" wide>
              <div
                className={`cs-gallery ${isTablet ? 'cs-gallery--tablet' : 'cs-gallery--phone'}`}
                style={isTablet ? undefined : ({ '--cols': Math.min(4, rest.length) } as React.CSSProperties)}
              >
                {rest.map((s) => (
                  <Picture key={s.src} shot={s} lang={language} />
                ))}
              </div>
            </Row>
          )}

          <nav className="cs-next" aria-label={t.cs.next}>
            <a href={`/projects/${next.id}`} onClick={(e) => onLinkClick(e, e.currentTarget.querySelector<HTMLElement>('.app-icon'))}>
              <span className="small muted">{t.cs.next}</span>
              <span className="cs-next-row">
                <AppIcon src={next.icon} inset={next.iconInset} size="clamp(56px, 6vw, 80px)" />
                <span className="cs-next-title">{next.title}</span>
                <ArrowRight size={28} aria-hidden />
              </span>
            </a>
          </nav>
        </div>
      </main>
      <Contact />
    </>
  );
};

