import React, { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { EDUCATION, EXPERIENCE, PROFILE, PROJECTS, SKILLS, getProject, type CvItem } from '../../data/projects';
import { useLanguage } from '../../i18n/LanguageContext';
import { onLinkClick } from '../../lib/router';
import { useReveal } from '../../lib/useReveal';
import { AppIcon } from '../ui/AppIcon';
import { Crossfade } from '../ui/Crossfade';
import { Contact } from '../layout/Contact';
import './home.css';

const launch = (e: React.MouseEvent<HTMLAnchorElement>) =>
  onLinkClick(e, e.currentTarget.querySelector<HTMLElement>('.app-icon'));

const reveal = (i: number) => ({ 'data-reveal': '', style: { '--i': i } as React.CSSProperties });

const HomeScreen: React.FC = () => {
  const { t, language } = useLanguage();
  return (
    <section className="home" id="top" aria-labelledby="home-title">
      <div className="wrap home-grid">
        <h1 id="home-title" className="home-title" {...reveal(0)}>
          {t.hero.title}
        </h1>

        <div className="home-side">
          <p className="lead" {...reveal(1)}>{t.hero.intro}</p>
          <div className="home-actions" {...reveal(2)}>
            <a className="btn" href="#work">
              {t.hero.cta} <ArrowDown size={18} aria-hidden />
            </a>
            <a className="text-link" href={`mailto:${PROFILE.links.email}`}>
              {t.hero.email}
            </a>
            <a className="text-link" href={PROFILE.cv[language]} target="_blank" rel="noopener">
              {t.hero.resume}
            </a>
          </div>
          <p className="home-status small" {...reveal(3)}>{t.status.open}</p>
        </div>

        <nav className="home-apps" aria-label={t.hero.apps}>
          <ul>
            {PROJECTS.map((p, i) => (
              <li key={p.id} {...reveal(i + 1)}>
                <a href={`/projects/${p.id}`} className="home-app" onClick={launch}>
                  <AppIcon src={p.icon} inset={p.iconInset} size="var(--icon)" eager />
                  <span className="home-app-name">{p.title}</span>
                  <span className="sr-only">, {p.kind[language]}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

const Featured: React.FC = () => {
  const { t, language } = useLanguage();
  const p = getProject('orbys-adventure')!;
  const stage = [p.gallery[0], p.beforeAfter!.after, p.gallery[1]];
  return (
    <section id="work" className="section" aria-labelledby="orby-title">
      <div className="wrap">
        <header className="proj-head" {...reveal(0)}>
          <AppIcon src={p.icon} size="clamp(56px, 6vw, 80px)" />
          <div>
            <h2 id="orby-title" className="section-title">{p.title}</h2>
            <p className="muted proj-meta">
              {p.kind[language]} · {p.year} · The Akanksha Foundation
            </p>
          </div>
        </header>

        <div className="feat-body">
          <div className="feat-stage" {...reveal(1)}>
            <Crossfade shots={stage} lang={language} />
          </div>
          <div className="feat-aside" {...reveal(2)}>
            <p className="lead">{p.summary[language]}</p>
            <dl className="facts">
              {p.facts.slice(1, 5).map((f) => (
                <div key={f.label.en}>
                  <dt>{f.label[language]}</dt>
                  <dd>{f.value[language]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="feat-story">
          <div {...reveal(0)}>
            <h3>{t.work.problem}</h3>
            <p className="feat-figure">{p.evidence![0].figure}</p>
            <p className="muted small">{p.evidence![0].label[language]}</p>
            <p>{p.problem[language]}</p>
          </div>
          <div {...reveal(1)}>
            <h3>{t.work.decision}</h3>
            <figure className="feat-photo">
              <img src={p.beforeAfter!.before.src} alt={p.beforeAfter!.before.alt[language]} width="1600" height="1066" loading="lazy" decoding="async" />
            </figure>
            <p>
              <strong>{p.decisions[0].title[language]}.</strong> {p.decisions[0].body[language]}
            </p>
          </div>
          <div {...reveal(2)}>
            <h3>{t.work.result}</h3>
            <p>{p.outcome![language]}</p>
            <a className="btn feat-cta" href={`/projects/${p.id}`} onClick={(e) => onLinkClick(e)}>
              {t.work.caseStudy} <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Shipped: React.FC = () => {
  const { t, language } = useLanguage();
  const p = getProject('you-can-only')!;
  const screens = [p.gallery[0], p.gallery[2], p.gallery[4]];
  return (
    <section className="section" aria-labelledby="yco-title">
      <div className="wrap ship-grid">
        <div className="ship-text">
          <header className="proj-head" {...reveal(0)}>
            <AppIcon src={p.icon} size="clamp(56px, 6vw, 80px)" />
            <div>
              <h2 id="yco-title" className="section-title">{p.title}</h2>
              <p className="muted proj-meta">
                {p.kind[language]} · {p.year} · {t.work.shipped}
              </p>
            </div>
          </header>
          <p className="lead" {...reveal(1)}>{p.summary[language]}</p>
          <div className="ship-decisions">
            {p.decisions.map((d, i) => (
              <div key={d.title.en} {...reveal(i + 2)}>
                <h3>{d.title[language]}</h3>
                <p>{d.body[language]}</p>
              </div>
            ))}
          </div>
          <div className="ship-actions" {...reveal(4)}>
            <a className="appstore" href={p.links!.appStore} target="_blank" rel="noopener noreferrer">
              <img src="/AppStore-Badge.svg" alt={t.work.appStore} width="135" height="40" />
            </a>
            <a className="btn btn--quiet" href={`/projects/${p.id}`} onClick={(e) => onLinkClick(e)}>
              {t.work.caseStudy} <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </div>

        <div className="ship-stage" {...reveal(1)}>
          {screens.map((s) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt[language]}
              width={s.w}
              height={s.h}
              loading="lazy"
              decoding="async"
              className="shot shot--phone"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const More: React.FC = () => {
  const { t, language } = useLanguage();
  const rest = PROJECTS.filter((p) => p.id !== 'orbys-adventure' && p.id !== 'you-can-only');
  const [active, setActive] = useState(rest[0].id);
  return (
    <section className="section" aria-labelledby="more-title">
      <div className="wrap">
        <div className="more-head" {...reveal(0)}>
          <h2 id="more-title" className="section-title">{t.work.moreTitle}</h2>
          <p className="lead muted">{t.work.moreIntro}</p>
        </div>
        <div className="more-grid">
          <ul className="more-list">
            {rest.map((p, i) => (
              <li key={p.id} {...reveal(i)}>
                <a
                  href={`/projects/${p.id}`}
                  className={`more-row ${active === p.id ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(p.id)}
                  onFocus={() => setActive(p.id)}
                  onClick={launch}
                >
                  <AppIcon src={p.icon} inset={p.iconInset} size="clamp(56px, 5vw, 72px)" />
                  <span className="more-main">
                    <span className="more-title">{p.title}</span>
                    <span className="more-kind">{p.kind[language]} · {p.year}</span>
                    <span className="more-summary">{p.problem[language]}</span>
                  </span>
                  <ArrowRight className="more-arrow" size={22} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <div className="more-preview" aria-hidden="true">
            {rest.map((p) => (
              <img
                key={p.id}
                src={p.gallery[0].src}
                alt=""
                width={p.gallery[0].w}
                height={p.gallery[0].h}
                loading="lazy"
                decoding="async"
                className={active === p.id ? 'is-on' : ''}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Method: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="method" className="section" aria-labelledby="method-title">
      <div className="wrap method-grid">
        <div className="method-head" {...reveal(0)}>
          <h2 id="method-title" className="section-title">{t.method.title}</h2>
          <p className="lead muted">{t.method.intro}</p>
        </div>
        <ol className="method-list">
          {t.method.items.map((item, i) => {
            const project = getProject(item.project)!;
            return (
              <li key={item.title} {...reveal(i)}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <p className="method-proof small">
                  <span className="method-proof-label">{t.method.proof}</span>
                  {item.proof}{' '}
                  <a className="text-link" href={`/projects/${project.id}`} onClick={(e) => onLinkClick(e)}>
                    {project.title}
                  </a>
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

const Letter: React.FC = () => {
  const { t, language } = useLanguage();
  const orby = getProject('orbys-adventure')!;
  const plate = orby.research!.photos[2];
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap letter-grid">
        <article className="letter" {...reveal(0)}>
          <header className="letter-head">
            <img src="/favicon.png" alt="" width="64" height="64" />
            <h2 id="about-title" className="section-title">{t.about.title}</h2>
          </header>
          {t.about.letter.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
          <p className="letter-sign">
            {t.about.signoff}
            <span className="small muted">{t.about.signrole}</span>
          </p>
        </article>
        <figure className="letter-plate" {...reveal(1)}>
          <img src={plate.src} alt={plate.alt[language]} width={plate.w} height={plate.h} loading="lazy" decoding="async" />
          <figcaption className="small muted">
            {plate.caption![language]}, Pune · {orby.title}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

const CvList: React.FC<{ items: CvItem[] }> = ({ items }) => {
  const { t, language } = useLanguage();
  return (
    <ol className="cv-list">
      {items.map((item, i) => (
        <li key={item.org + item.years} {...reveal(i)}>
          <span className="cv-years">{item.years.replace('oggi', t.cv.now)}</span>
          <div>
            <p className="cv-role">{item.role[language]}</p>
            <p className="cv-org">{item.org}</p>
            <p className="cv-note small">{item.note[language]}</p>
          </div>
        </li>
      ))}
    </ol>
  );
};

const Resume: React.FC = () => {
  const { t, language } = useLanguage();
  return (
    <section id="cv" className="section section--field" aria-labelledby="cv-title">
      <div className="wrap">
        <div className="cv-head" {...reveal(0)}>
          <h2 id="cv-title" className="section-title">{t.cv.title}</h2>
          <a className="btn" href={PROFILE.cv[language]} target="_blank" rel="noopener">
            {t.cv.download} <ArrowUpRight size={18} aria-hidden />
          </a>
        </div>
        <div className="cv-cols">
          <div>
            <h3 className="cv-heading">{t.cv.experience}</h3>
            <CvList items={EXPERIENCE} />
          </div>
          <div>
            <h3 className="cv-heading">{t.cv.education}</h3>
            <CvList items={EDUCATION} />
          </div>
        </div>
        <div className="skills">
          <h3 className="cv-heading">{t.cv.skills}</h3>
          <dl>
            {SKILLS.map((s, i) => (
              <div key={s.group.en} {...reveal(i)}>
                <dt>{s.group[language]}</dt>
                <dd>{s.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export const Home: React.FC = () => {
  const { language } = useLanguage();
  useReveal([language]);
  return (
    <>
      <main id="main">
        <HomeScreen />
        <Featured />
        <Shipped />
        <More />
        <Method />
        <Letter />
        <Resume />
      </main>
      <Contact />
    </>
  );
};

