import React, { useEffect } from 'react';
import { 
  ArrowLeft, User, Building2, Award, Target, 
  BookOpen, Users, Compass, Cpu, Layers, Sparkles, CheckCircle2, 
  Layers3, HeartHandshake, Globe
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const OrbyCaseStudy: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    window.location.href = '/';
  };

  const isIt = language === 'it';

  return (
    <div className="orby-cs-shell">
      {/* Ambient Glows */}
      <div className="ambient-bg">
        <div className="ambient-glow-1"></div>
        <div className="ambient-glow-2"></div>
      </div>

      {/* Navigation Header Dock */}
      <header className="cs-nav-header">
        <div className="container cs-nav-container">
          <button onClick={handleBack} className="cs-back-btn">
            <ArrowLeft size={16} />
            <span>{isIt ? 'Torna al Portfolio' : 'Back to Portfolio'}</span>
          </button>

          <div className="cs-header-right">
            {/* Matching Language Switcher Pill */}
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

            <span className="cs-nav-tag">Product Design Case Study</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="cs-main-body">

        {/* 1. HERO SECTION */}
        <section className="cs-hero-section">
          <div className="container">
            <div className="hero-badge-pill">
              <Sparkles size={14} color="#10b981" />
              <span>Apple Developer Academy — Pier Program</span>
            </div>

            <h1 className="cs-hero-title">Orby's Adventure</h1>
            <p className="cs-hero-subtitle">
              {isIt 
                ? 'Gioco educativo per iPadOS per il consolidamento matematico e il ragionamento spaziale'
                : 'Educational iPad Game for Mathematical Reinforcement & Spatial Reasoning'}
            </p>

            {/* Meta Grid */}
            <div className="cs-hero-meta-grid">
              <div className="meta-card">
                <span className="meta-label">{isIt ? 'Ruolo' : 'Role'}</span>
                <span className="meta-value">UX/UI Designer & Game Designer</span>
              </div>
              <div className="meta-card">
                <span className="meta-label">Cliente</span>
                <span className="meta-value">The Akanksha Foundation (India)</span>
              </div>
              <div className="meta-card">
                <span className="meta-label">Programma</span>
                <span className="meta-value">Apple Developer Academy — PIER Program</span>
              </div>
              <div className="meta-card">
                <span className="meta-label">Piattaforma</span>
                <span className="meta-value">iPadOS</span>
              </div>
            </div>

            {/* Large Cover Hero Image */}
            <div className="cs-cover-frame glass-panel">
              <img 
                src="/projects/orby/1orby.png" 
                alt="Orby's Adventure Cover Showcase" 
                className="cs-cover-img" 
              />
            </div>
          </div>
        </section>


        {/* 2. OVERVIEW SECTION */}
        <section className="cs-section">
          <div className="container">
            <div className="badge-editorial">
              <BookOpen size={13} />
              <span>02. {isIt ? 'Panoramica Generale' : 'Executive Overview'}</span>
            </div>

            <div className="cs-grid-two">
              <div className="cs-text-col">
                <h2 className="cs-heading">
                  {isIt ? 'Matematica Gamificata per la Scuola Primaria' : 'Gamified Mathematics for Primary Education'}
                </h2>
                <p className="cs-paragraph">
                  {isIt ? (
                    <><strong>Orby's Adventure</strong> è un gioco educativo per iPad progettato in collaborazione diretta con <strong>The Akanksha Foundation</strong> all'interno dell'Apple Developer Academy PIER Program.</>
                  ) : (
                    <><strong>Orby's Adventure</strong> is an educational iPad game designed in direct collaboration with <strong>The Akanksha Foundation</strong> within the Apple Developer Academy PIER Program.</>
                  )}
                </p>
                <p className="cs-paragraph">
                  {isIt
                    ? 'L’obiettivo principale era aiutare gli studenti delle scuole primarie e secondarie di primo grado in India a padroneggiare concetti matematici fondamentali—in particolare il ragionamento spaziale, i rapporti e le frazioni—attraverso l’apprendimento interattivo basato sul gioco.'
                    : 'The primary objective was to help Indian primary and middle school students master foundational mathematics—specifically spatial reasoning, ratios, and fractions—through interactive, game-based learning.'}
                </p>
              </div>

              <div className="cs-highlight-box glass-panel">
                <h3 className="box-title">
                  <Target size={18} color="#10b981" /> 
                  {isIt ? 'Oltre il Semplice Game Design' : 'Beyond Simple Game Design'}
                </h3>
                <p className="box-desc">
                  {isIt
                    ? 'Questo progetto non è stato soltanto un esercizio di game design, ma un processo completo di UX Product Design che ha compreso l’analisi quantitativa dei dati, la ricerca utenti sul campo nelle classi di Pune, il prototipaggio rapido e il testing iterativo continuo.'
                    : 'This project was not merely a game design exercise, but a complete UX product design process involving deep quantitative data analysis, field user research in Pune classrooms, rapid prototyping, and continuous iterative testing.'}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* 3. THE CHALLENGE SECTION */}
        <section className="cs-section">
          <div className="container">
            <div className="badge-editorial">
              <Target size={13} />
              <span>03. {isIt ? 'La Sfida Educativa' : 'The Educational Challenge'}</span>
            </div>

            <h2 className="cs-heading">
              {isIt ? 'Affrontare il Divario di Apprendimento' : 'Addressing the Core Learning Disconnect'}
            </h2>

            <div className="cs-cards-grid-4">
              <div className="cs-card glass-panel">
                <span className="card-icon">📉</span>
                <h4>{isIt ? 'Basso Engagement' : 'Low Engagement'}</h4>
                <p>{isIt ? 'L’apprendimento noioso a memoria portava a un forte calo rendimento e perdita di fiducia.' : 'Traditional rote learning and formula drills led to severe academic decline and loss of confidence.'}</p>
              </div>

              <div className="cs-card glass-panel">
                <span className="card-icon">🧩</span>
                <h4>{isIt ? 'Barriere Concettuali Astratte' : 'Abstract Conceptual Barriers'}</h4>
                <p>{isIt ? 'Gli studenti faticavano a visualizzare geometria spaziale, rapporti e frazioni senza contesto pratico.' : 'Students struggled to visualize spatial geometry, ratios, and fractions without physical or visual context.'}</p>
              </div>

              <div className="cs-card glass-panel">
                <span className="card-icon">🗣️</span>
                <h4>{isIt ? 'Frizione Linguistica' : 'Language & Comprehension Friction'}</h4>
                <p>{isIt ? 'I test matematici richiedevano di leggere complessi problemi in inglese, aumentando la difficoltà per i non madrelingua.' : 'Mathematical tests required reading complex English word problems, compounding difficulty for non-native speakers.'}</p>
              </div>

              <div className="cs-card glass-panel">
                <span className="card-icon">⚖️</span>
                <h4>{isIt ? 'Educazione vs Intrattenimento' : 'Education vs. Entertainment'}</h4>
                <p>{isIt ? 'Bilanciare il rigore pedagogico con meccaniche di gioco coinvolgenti senza causare sovraccarico cognitivo.' : 'Balancing rigorous pedagogical reinforcement with rewarding game mechanics without causing cognitive overload.'}</p>
              </div>
            </div>

            <div className="cs-insight-quote glass-panel">
              <p>
                {isIt
                  ? '"Progettare prodotti educativi per bambini richiede un cambio di paradigma: a differenza delle app consumer dove efficienza e velocità sono fondamentali, la UX educativa deve bilanciare frizione cognitiva, guida progressiva e motivazione emotiva."'
                  : '"Designing educational products for children requires a fundamental shift: unlike consumer apps where efficiency and speed are paramount, educational UX must balance cognitive friction, scaffolded guidance, and emotional motivation."'}
              </p>
            </div>
          </div>
        </section>


        {/* 4. ABOUT AKANKSHA FOUNDATION */}
        <section className="cs-section">
          <div className="container">
            <div className="badge-editorial">
              <Building2 size={13} />
              <span>04. {isIt ? 'Cliente e Missione Partner' : 'Client & Mission Partner'}</span>
            </div>

            <div className="cs-grid-two align-center">
              <div className="cs-text-col">
                <h2 className="cs-heading">The Akanksha Foundation</h2>
                <p className="cs-paragraph">
                  {isIt ? (
                    <>Fondata nel 1991, <strong>The Akanksha Foundation</strong> è un'organizzazione no-profit in India impegnata a offrire a bambini di comunità a basso reddito un'istruzione di alta qualità e olistica.</>
                  ) : (
                    <>Established in 1991, <strong>The Akanksha Foundation</strong> is a non-profit organization in India dedicated to providing children from low-income communities with access to high-quality, holistic education.</>
                  )}
                </p>
                <p className="cs-paragraph">
                  {isIt
                    ? 'Akanksha gestisce 27 scuole in partnership pubblico-privata tra Mumbai, Pune e Nagpur, supportando oltre 14.000 studenti. Tutte le scuole Akanksha integrano pratiche di apprendimento Socio-Emozionale ed Etico (SEE) nel programma giornaliero.'
                    : 'Akanksha operates 27 public-private partnership schools across Mumbai, Pune, and Nagpur, supporting over 14,000 students. All Akanksha schools integrate Socio-Emotional and Ethical (SEE) learning practices into daily timetables.'}
                </p>
              </div>

              <div className="client-brand-card glass-panel">
                <img 
                  src="/projects/orby/appicon-orby.png" 
                  alt="Orby App Icon" 
                  className="client-logo-img" 
                />
                <div className="client-stats">
                  <div className="stat-item">
                    <span className="stat-num">27</span>
                    <span className="stat-lbl">{isIt ? 'Scuole Supportate' : 'Schools Supported'}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-num">14,000+</span>
                    <span className="stat-lbl">{isIt ? 'Studenti Attivi' : 'Active Students'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 5. RESEARCH & DATA ANALYSIS */}
        <section className="cs-section">
          <div className="container">
            <div className="badge-editorial">
              <Compass size={13} />
              <span>05. {isIt ? 'Ricerca e Analisi Quantitativa' : 'Research & Quantitative Analysis'}</span>
            </div>

            <h2 className="cs-heading">
              {isIt ? 'Analisi dei Dati e Definizione del Problema' : 'Data-Driven Problem Discovery'}
            </h2>
            <p className="cs-lead-paragraph">
              {isIt
                ? 'Per identificare il punto esatto di intervento, il nostro team ha analizzato i dataset di performance accademica di tre scuole Akanksha (MEMS, SBP, PKGEMS) dalla 3ª alla 8ª classe.'
                : 'To identify the exact intervention point, our team analyzed academic performance datasets from three Akanksha schools (MEMS, SBP, PKGEMS) across Grades 3 to 8.'}
            </p>

            {/* Data Finding Box */}
            <div className="cs-data-callout glass-panel">
              <div className="data-callout-header">
                <span className="alert-badge">{isIt ? 'Risultato Chiave della Ricerca' : 'Critical Research Finding'}</span>
                <h3>{isIt ? 'La 6ª Classe: Il Calo di Rendimento' : 'Grade 6: The Learning Drop-off Cliff'}</h3>
              </div>
              <p>
                {isIt ? (
                  <>I dati di valutazione hanno rivelato un calo drastico nel tasso di successo degli studenti a partire proprio dalla <strong>6ª classe (media superamento 32.3% – 38.2%)</strong>. La 6ª classe segna la transizione dall'aritmetica meccanica al ragionamento contestuale in inglese.</>
                ) : (
                  <>Assessment data revealed a dramatic decline in student success rates starting specifically at <strong>Grade 6 (32.3% – 38.2% average pass rate)</strong>. Grade 6 marks the transition from mechanical arithmetic to contextual reasoning in English.</>
                )}
              </p>

              <div className="heatmap-summary-grid">
                <div className="heatmap-item lowest">
                  <span className="hm-label">{isIt ? 'Rapporti e Proporzioni' : 'Ratio & Proportion'}</span>
                  <span className="hm-value">{isIt ? 'Tasso di successo più basso (32.3%)' : 'Lowest Success Rate (32.3%)'}</span>
                </div>
                <div className="heatmap-item lowest">
                  <span className="hm-label">{isIt ? 'Frazioni e Geometria' : 'Fractions & Geometry'}</span>
                  <span className="hm-value">{isIt ? 'Alto tasso di insuccesso (38.2%)' : 'High Failure Rate (38.2%)'}</span>
                </div>
                <div className="heatmap-item moderate">
                  <span className="hm-label">{isIt ? 'Operazioni Base' : 'Basic Operations'}</span>
                  <span className="hm-value">{isIt ? 'Padronanza moderata (58.4%)' : 'Moderate Mastery (58.4%)'}</span>
                </div>
              </div>
            </div>

            <div className="cs-image-single glass-panel">
              <img src="/projects/orby/2orby.png" alt="Orby Research Dashboard" />
            </div>
          </div>
        </section>


        {/* 6. USER RESEARCH & PERSONAS */}
        <section className="cs-section">
          <div className="container">
            <div className="badge-editorial">
              <Users size={13} />
              <span>06. {isIt ? 'Target Utenti e Personas' : 'Target Users & Personas'}</span>
            </div>

            <h2 className="cs-heading">
              {isIt ? 'Comprendere i Nostri Giovani Utenti' : 'Understanding Our Young Learners'}
            </h2>

            <div className="cs-grid-two">
              <div className="cs-persona-card glass-panel">
                <div className="persona-header">
                  <div className="persona-avatar">🎒</div>
                  <div>
                    <h3>{isIt ? 'Studente di 6ª Classe (10–12 anni)' : 'Grade 6 Student (Ages 10–12)'}</h3>
                    <span className="persona-tag">{isIt ? 'Utente Target Principale' : 'Primary Target User'}</span>
                  </div>
                </div>

                <ul className="persona-list">
                  <li><strong>{isIt ? 'Contesto:' : 'Context:'}</strong> {isIt ? 'Studia in scuole di comunità Akanksha con iPad condivisi.' : 'Learns in Akanksha low-income community schools using shared iPads.'}</li>
                  <li><strong>{isIt ? 'Bisogni:' : 'Needs:'}</strong> {isIt ? 'Feedback visivo immediato, istruzioni non verbali, basso impatto del testo.' : 'Immediate visual feedback, non-verbal instructions, low text barrier.'}</li>
                  <li><strong>{isIt ? 'Punti di Frizione:' : 'Pain Points:'}</strong> {isIt ? 'Frustrazione con lunghi problemi in inglese; timore di sbagliare nelle esercitazioni classiche.' : 'Frustration with long English math word problems; fear of failure in traditional drills.'}</li>
                  <li><strong>{isIt ? 'Motivazioni:' : 'Motivations:'}</strong> {isIt ? 'Storytelling, progressione di gioco, premi visivi, controlli touch tattili.' : 'Storytelling, playful progression, visual rewards, tactile touch controls.'}</li>
                </ul>
              </div>

              <div className="cs-persona-card glass-panel">
                <div className="persona-header">
                  <div className="persona-avatar">👩‍🏫</div>
                  <div>
                    <h3>{isIt ? 'Docenti di Matematica e Dirigenti' : 'Math Educators & Principals'}</h3>
                    <span className="persona-tag">{isIt ? 'Stakeholders Chiave' : 'Key Stakeholders'}</span>
                  </div>
                </div>

                <ul className="persona-list">
                  <li><strong>{isIt ? 'Contesto:' : 'Context:'}</strong> {isIt ? 'Gestione di classi numerose nelle scuole di Pune e Mumbai.' : 'Managing large classrooms in Pune and Mumbai schools.'}</li>
                  <li><strong>{isIt ? 'Bisogni:' : 'Needs:'}</strong> {isIt ? 'Strumento complementare di rafforzamento al di fuori delle ore di lezione.' : 'Complementary tool for practice outside classroom instruction hours.'}</li>
                  <li><strong>{isIt ? 'Punti di Frizione:' : 'Pain Points:'}</strong> {isIt ? 'Mancanza di strumenti orientati alla pratica (i software esistenti erano solo di spiegazione teorica).' : 'Lack of practice-oriented reinforcement tools (existing tools were purely instructional).'}</li>
                  <li><strong>{isIt ? 'Motivazioni:' : 'Motivations:'}</strong> {isIt ? 'Accrescere la fiducia degli studenti, suggerimenti guidati, chiarezza di progresso.' : 'Building student confidence, scaffolded hints, progress clarity.'}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>


        {/* 7. DESIGN PROCESS TIMELINE */}
        <section className="cs-section">
          <div className="container">
            <div className="badge-editorial">
              <Layers size={13} />
              <span>07. {isIt ? 'Processo di Design End-to-End' : 'End-to-End Design Process'}</span>
            </div>

            <h2 className="cs-heading">
              {isIt ? 'Roadmap di Sviluppo Prodotto Iterativo' : 'Iterative Product Development Roadmap'}
            </h2>

            <div className="cs-process-stepper">
              <div className="step-card glass-panel">
                <span className="step-num">01</span>
                <h4>{isIt ? 'Ricerca e Analisi' : 'Research & Data Analysis'}</h4>
                <p>{isIt ? 'Valutazione dataset classi 3–8 e identificazione heatmap.' : 'Grade 3–8 dataset evaluation & topic heatmap discovery.'}</p>
              </div>

              <div className="step-card glass-panel">
                <span className="step-num">02</span>
                <h4>{isIt ? 'Definizione Problema' : 'Problem Definition'}</h4>
                <p>{isIt ? 'Focus su concetti spaziali, rapporti e frazioni della 6ª classe.' : 'Targeting Grade 6 Ratio, Proportion, & Spatial concepts.'}</p>
              </div>

              <div className="step-card glass-panel">
                <span className="step-num">03</span>
                <h4>{isIt ? 'Ideazione e Flussi' : 'Ideation & Flow'}</h4>
                <p>{isIt ? 'Meccaniche di gioco gesture-first e struttura della storia.' : 'Gesture-first mini-game mechanics & story outline.'}</p>
              </div>

              <div className="step-card glass-panel">
                <span className="step-num">04</span>
                <h4>{isIt ? 'Wireframe e Prototipo' : 'Wireframing & Prototype'}</h4>
                <p>{isIt ? 'Wireframe interattivi per iPad e primi test di gioco.' : 'Interactive iPad wireframes & early playtesting.'}</p>
              </div>

              <div className="step-card glass-panel">
                <span className="step-num">05</span>
                <h4>{isIt ? 'Testing sul Campo' : 'Field Usability Testing'}</h4>
                <p>{isIt ? 'Viaggio di ricerca a Pune per test nelle classi con studenti e insegnanti.' : 'On-site testing trip in Pune classrooms with students & teachers.'}</p>
              </div>

              <div className="step-card glass-panel">
                <span className="step-num">06</span>
                <h4>{isIt ? 'Iterazioni TestFlight' : 'TestFlight Iterations'}</h4>
                <p>{isIt ? 'Build 1.1–1.2 per raffinare onboarding, suggerimenti e rifiniture UI.' : 'Builds 1.1–1.2 refining onboarding, scaffolded hints, & UI polish.'}</p>
              </div>
            </div>
          </div>
        </section>


        {/* 8. UX STRATEGY & ARCHITECTURE */}
        <section className="cs-section">
          <div className="container">
            <div className="badge-editorial">
              <Cpu size={13} />
              <span>08. {isIt ? 'Strategia e Architettura UX' : 'UX Strategy & Architecture'}</span>
            </div>

            <h2 className="cs-heading">
              {isIt ? 'Sistema di Consolidamento Guidato' : 'Scaffolded Practice & Reinforcement System'}
            </h2>

            <div className="cs-grid-three">
              <div className="cs-feature-card glass-panel">
                <h4>{isIt ? 'Architettura dell’Informazione' : 'Information Architecture'}</h4>
                <p>{isIt ? 'Organizzata in 5 moduli di apprendimento: Rapporti, Proporzioni, Operazioni Base, Frazioni e Problemi a Parole.' : 'Organized into 5 dedicated learning modules: Ratio, Proportion, Basic Operations, Fractions, and Word Problems.'}</p>
              </div>

              <div className="cs-feature-card glass-panel">
                <h4>{isIt ? 'Loop di Feedback e Suggerimenti' : 'Feedback Loops & Hints'}</h4>
                <p>{isIt ? 'Sostituite le schermate rigide di errore con aiuti visivi graduali per guidare l’utente verso la soluzione.' : 'Replaced binary right/wrong screens with step-by-step visual scaffolding to guide students toward answers independently.'}</p>
              </div>

              <div className="cs-feature-card glass-panel">
                <h4>{isIt ? 'Progressione e Padronanza' : 'Game Progression & Mastery'}</h4>
                <p>{isIt ? 'Difficoltà adattiva per sviluppare fiducia prima di affrontare sfide a più passaggi.' : 'Adaptive difficulty scaling ensuring students build confidence before advancing to complex multi-step challenges.'}</p>
              </div>
            </div>

            <div className="cs-image-single glass-panel margin-top">
              <img src="/projects/orby/3orby.png" alt="Orby Architecture & Game Selection Screen" />
            </div>
          </div>
        </section>


        {/* 9. UI DESIGN SYSTEM */}
        <section className="cs-section">
          <div className="container">
            <div className="badge-editorial">
              <Sparkles size={13} />
              <span>09. {isIt ? 'Sistema Visivo e Design UI' : 'UI Design & Visual System'}</span>
            </div>

            <h2 className="cs-heading">
              {isIt ? 'Linguaggio Visivo Accessibile e Tattile' : 'Accessible & Tactile Visual Language'}
            </h2>

            <div className="cs-grid-two">
              <div className="cs-text-col">
                <p className="cs-paragraph">
                  {isIt
                    ? 'La direzione visiva è stata sviluppata attorno ad elementi cromatici ad alto contrasto, forme organiche morbide e illustrazioni per ridurre l’ansia da prestazione in matematica.'
                    : 'The visual direction was built around high-contrast vibrant elements, rounded organic shapes, and friendly character illustrations to reduce math anxiety.'}
                </p>

                <div className="ui-pills-list">
                  <div className="ui-pill"><strong>{isIt ? 'Tipografia:' : 'Typography:'}</strong> {isIt ? 'Font ad alta leggibilità ottimizzati per schermi iPad' : 'Large legibility fonts optimized for iPad screens'}</div>
                  <div className="ui-pill"><strong>{isIt ? 'Accessibilità:' : 'Accessibility:'}</strong> {isIt ? 'Elevati rapporti di contrasto e target di tocco ampi' : 'High contrast ratios & touch-friendly tap targets'}</div>
                </div>
              </div>

              <div className="cs-image-single glass-panel">
                <img src="/projects/orby/4orby.png" alt="Orby UI Components & Design System" />
              </div>
            </div>

            <div className="cs-gallery-row grid-2 margin-top">
              <div className="cs-gallery-card glass-panel">
                <img src="/projects/orby/7orby.png" alt="Orby UI Gameplay 1" />
              </div>
              <div className="cs-gallery-card glass-panel">
                <img src="/projects/orby/8orby.png" alt="Orby UI Gameplay 2" />
              </div>
            </div>
          </div>
        </section>


        {/* 10. GAME DESIGN & MECHANICS */}
        <section className="cs-section">
          <div className="container">
            <div className="badge-editorial">
              <Layers3 size={13} />
              <span>10. {isIt ? 'Meccaniche di Game Design' : 'Educational Game Mechanics'}</span>
            </div>

            <h2 className="cs-heading">
              {isIt ? 'Imparare Attraverso l’Azione' : 'Learning-Through-Doing Mechanics'}
            </h2>
            <p className="cs-lead-paragraph">
              {isIt
                ? 'Ogni meccanica di mini-gioco è stata progettata affinché le azioni nel gioco riflettano direttamente il ragionamento matematico sottostante.'
                : 'Every mini-game mechanic was crafted so that game actions directly mirror mathematical reasoning rather than functioning as superficial rewards.'}
            </p>

            <div className="cs-gallery-row grid-2">
              <div className="cs-gallery-card glass-panel">
                <img src="/projects/orby/5orby.png" alt="Fraction mini-games" />
                <div className="card-caption">
                  <h5>{isIt ? 'Mini-giochi sulle frazioni' : 'Fraction mini-games'}</h5>
                  <p>{isIt ? 'Meccaniche interattive drag-and-drop per visualizzare parti uguali e valori frazionari.' : 'Interactive drag-and-drop mechanics to visualize equal parts and fractional values.'}</p>
                </div>
              </div>

              <div className="cs-gallery-card glass-panel">
                <img src="/projects/orby/6orby.png" alt="Basic Operations" />
                <div className="card-caption">
                  <h5>{isIt ? 'Operazioni Base' : 'Basic Operations'}</h5>
                  <p>{isIt ? 'Mini-giochi coinvolgenti per la pratica dell’aritmetica essenziale, incluse moltiplicazioni e divisioni.' : 'Engaging mini-games for essential arithmetic practice, including multiplication and division.'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 11. USER TESTING IN PUNE, INDIA */}
        <section className="cs-section highlight-section">
          <div className="container">
            <div className="badge-editorial">
              <HeartHandshake size={13} />
              <span>11. {isIt ? 'Testing Utenti sul Campo a Pune, India' : 'On-Site User Testing in Pune, India'}</span>
            </div>

            <h2 className="cs-heading">
              {isIt ? 'Validazione dei Prototipi nelle Classi Reali' : 'Validating Prototypes in Real Classrooms'}
            </h2>
            <p className="cs-lead-paragraph">
              {isIt
                ? 'Il nostro team si è recato a Pune per condurre sessioni di usabilità, osservazioni nelle classi, interviste agli insegnanti e workshop di co-design direttamente nelle scuole Akanksha.'
                : 'Our team traveled to Pune to conduct usability sessions, classroom observations, teacher interviews, and storytelling co-design activities directly in Akanksha schools.'}
            </p>

            {/* Field Photos Grid */}
            <div className="cs-field-photo-grid">
              <div className="photo-card glass-panel">
                <img src="/projects/orby/testing1.jpg" alt="Testing Session 1 in Pune" />
                <span>{isIt ? 'Test di usabilità con studenti di 6ª classe su iPad' : 'Usability testing with Grade 6 students on iPad'}</span>
              </div>

              <div className="photo-card glass-panel">
                <img src="/projects/orby/testing2.jpg" alt="Testing Session 2 in Pune" />
                <span>{isIt ? 'Workshop di co-design e storytelling' : 'Co-design & storytelling workshops'}</span>
              </div>

              <div className="photo-card glass-panel">
                <img src="/projects/orby/testing3.jpg" alt="Teacher alignment" />
                <span>{isIt ? 'Allineamento con i docenti' : 'Teacher alignment'}</span>
              </div>

              <div className="photo-card glass-panel">
                <img src="/projects/orby/testing4.jpg" alt="Observing gesture interactions" />
                <span>{isIt ? 'Osservazione delle interazioni gesture' : 'Observing gesture interactions'}</span>
              </div>

              <div className="photo-card glass-panel">
                <img src="/projects/orby/testing5.jpg" alt="User testing with teachers" />
                <span>{isIt ? 'User testing con i docenti' : 'User testing with teachers'}</span>
              </div>

              <div className="photo-card glass-panel">
                <img src="/projects/orby/testing6.jpg" alt="Feedback session" />
                <span>{isIt ? 'Sessione di feedback' : 'Feedback session'}</span>
              </div>
            </div>

            {/* Testing Insights Box */}
            <div className="cs-insights-card glass-panel margin-top">
              <h3>{isIt ? 'Insight Principali dal Campo' : 'Key Field Testing Insights'}</h3>
              <div className="insights-grid">
                <div className="ins-item">
                  <strong>{isIt ? 'Frizione con le Istruzioni:' : 'Instruction Friction:'}</strong> {isIt ? 'Gli studenti spendevano più tempo a decifrare le istruzioni che a risolvere i problemi. Soluzione: Passaggio ad animazioni gesture.' : 'Students spent more time deciphering game instructions than solving math. Solution: Shifted to gesture animations.'}
                </div>
                <div className="ins-item">
                  <strong>{isIt ? 'Suggerimenti Progressivi:' : 'Need for Scaffolded Hints:'}</strong> {isIt ? 'I docenti hanno richiesto aiuti esplicativi anziché semplici verifiche corretto/errato.' : 'Teachers requested explanatory hints instead of simple right/wrong checks.'}
                </div>
                <div className="ins-item">
                  <strong>{isIt ? 'Separazione degli Argomenti:' : 'Topic Separation:'}</strong> {isIt ? 'Raccomandati livelli progressivi anziché mescolare più concetti contemporaneamente.' : 'Recommended progressive concept levels instead of mixing multiple math topics simultaneously.'}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 12. MULTIDISCIPLINARY COLLABORATION */}
        <section className="cs-section">
          <div className="container">
            <div className="badge-editorial">
              <Users size={13} />
              <span>12. {isIt ? 'Collaborazione Multidisciplinare' : 'Cross-Functional Collaboration'}</span>
            </div>

            <h2 className="cs-heading">
              {isIt ? 'Agile Scrum e Partnership con gli Stakeholder' : 'Agile Scrum & Stakeholder Partnership'}
            </h2>

            <div className="cs-grid-two">
              <div className="cs-text-col">
                <p className="cs-paragraph">
                  {isIt ? (
                    <>Sviluppato all'interno dell'<strong>Apple Developer Academy | UNINA PIER Program</strong>, il nostro team multidisciplinare di 7 persone ha lavorato in sprint Agile Scrum di due settimane utilizzando Jira e Figma.</>
                  ) : (
                    <>Developed within the <strong>Apple Developer Academy | UNINA PIER Program</strong>, our multidisciplinary team of 7 worked in two-week Agile Scrum sprints using Jira and Figma.</>
                  )}
                </p>
                <p className="cs-paragraph">
                  {isIt
                    ? 'Il coordinamento continuo tra designer, sviluppatori, dirigenti di Akanksha Foundation e docenti di matematica ha garantito la fattibilità tecnica in SwiftUI e il rigore pedagogico.'
                    : 'Continuous synchronization between designers, developers, Akanksha Foundation stakeholders, and mathematics teachers ensured technical feasibility in SwiftUI and pedagogical rigor.'}
                </p>
              </div>

              <div className="cs-collab-card glass-panel">
                <h4>{isIt ? 'Allineamento Stakeholders' : 'Stakeholder Alignment'}</h4>
                <ul>
                  <li><CheckCircle2 size={16} color="#10b981" /> {isIt ? 'Revisioni bisettimanali con i direttori educativi Akanksha.' : 'Bi-weekly reviews with Akanksha educational directors.'}</li>
                  <li><CheckCircle2 size={16} color="#10b981" /> {isIt ? 'Pairing con sviluppatori per fisica SpriteKit ed effetti tattili.' : 'Developer pairing for SpriteKit physics and haptics.'}</li>
                  <li><CheckCircle2 size={16} color="#10b981" /> {isIt ? 'Cicli di rilascio rapidi su TestFlight (Build 1.1–1.2).' : 'Rapid TestFlight deployment cycles (Build 1.1–1.2).'}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>


        {/* 13. MY RESPONSIBILITIES */}
        <section className="cs-section">
          <div className="container">
            <div className="badge-editorial">
              <User size={13} />
              <span>13. {isIt ? 'Ruolo e Responsabilità' : 'My Role & Responsibilities'}</span>
            </div>

            <h2 className="cs-heading">
              {isIt ? 'Contributi al Product Design' : 'Product Design Contributions'}
            </h2>

            <div className="cs-skills-checklist">
              <div className="chk-item glass-panel"><CheckCircle2 size={18} color="#10b981" /> <span>{isIt ? 'Analisi Dati Quantitativa (Dataset scolastici)' : 'Quantitative Data Analysis (School datasets)'}</span></div>
              <div className="chk-item glass-panel"><CheckCircle2 size={18} color="#10b981" /> <span>{isIt ? 'User Testing sul Campo (Pune, India)' : 'On-Site Field Usability Testing (Pune, India)'}</span></div>
              <div className="chk-item glass-panel"><CheckCircle2 size={18} color="#10b981" /> <span>{isIt ? 'Interviste Utenti e Workshop di Co-Design' : 'User Interviews & Co-Design Workshops'}</span></div>
              <div className="chk-item glass-panel"><CheckCircle2 size={18} color="#10b981" /> <span>{isIt ? 'Game Mechanics e Interaction Design' : 'Game Mechanics & Interaction Design'}</span></div>
              <div className="chk-item glass-panel"><CheckCircle2 size={18} color="#10b981" /> <span>{isIt ? 'Architettura dell’Informazione e Wireframing' : 'Information Architecture & Wireframing'}</span></div>
              <div className="chk-item glass-panel"><CheckCircle2 size={18} color="#10b981" /> <span>{isIt ? 'UI iPadOS ad Alta Fedeltà e Design System' : 'High-Fidelity iPadOS UI & Design System'}</span></div>
              <div className="chk-item glass-panel"><CheckCircle2 size={18} color="#10b981" /> <span>{isIt ? 'Onboarding Visivo e Suggerimenti Progressivi' : 'Visual Onboarding & Scaffolded Hints'}</span></div>
              <div className="chk-item glass-panel"><CheckCircle2 size={18} color="#10b981" /> <span>{isIt ? 'Sprint Cross-Funzionali e Presentazioni al Cliente' : 'Cross-Functional Sprint & Client Presentation'}</span></div>
            </div>
          </div>
        </section>


        {/* 14. KEY LEARNINGS */}
        <section className="cs-section">
          <div className="container">
            <div className="badge-editorial">
              <Award size={13} />
              <span>14. {isIt ? 'Apprendimenti Professionali Chiave' : 'Key Professional Takeaways'}</span>
            </div>

            <h2 className="cs-heading">
              {isIt ? 'Cosa Mi Ha Insegnato Questo Progetto' : 'What This Project Taught Me'}
            </h2>

            <div className="cs-grid-three">
              <div className="cs-card glass-panel">
                <h4>{isIt ? 'Progettare per Bambini' : 'Designing for Children'}</h4>
                <p>{isIt ? 'I ragazzi navigano i feedback in modo intuitivo; i segnali visivi non verbali sono molto più efficaci delle istruzioni scritte.' : 'Kids navigate interface feedback intuitively; non-verbal visual cues are infinitely more effective than written instructions.'}</p>
              </div>

              <div className="cs-card glass-panel">
                <h4>{isIt ? 'I Dati Incontrano l’Empatia' : 'Data Meets Empathy'}</h4>
                <p>{isIt ? 'I grafici di analisi ci hanno mostrato DOVE fosse il problema, ma la ricerca sul campo a Pune ha spiegato il PERCHÉ.' : 'Quantitative drop-off charts told us where the problem was, but field research in Pune revealed why.'}</p>
              </div>

              <div className="cs-card glass-panel">
                <h4>{isIt ? 'UX Progressiva' : 'Scaffolded UX'}</h4>
                <p>{isIt ? 'Le interfacce educative dovrebbero sviluppare fiducia attraverso una guida graduale anziché penalizzare gli errori.' : 'Educational interfaces should encourage confidence through gradual guidance rather than penalizing mistakes.'}</p>
              </div>
            </div>
          </div>
        </section>


        {/* 15. FINAL OUTCOME & IMPACT */}
        <section className="cs-section cs-final-section">
          <div className="container">
            <div className="cs-final-card glass-panel">
              <span className="yco-tag">15. {isIt ? 'Impatto Finale e Conclusione' : 'Final Impact & Conclusion'}</span>
              <h2>{isIt ? 'Uno Strumento di Apprendimento Trasformativo' : 'A Transformative Learning Tool'}</h2>
              <p>
                {isIt
                  ? 'Orby’s Adventure ha dimostrato con successo che il consolidamento basato sul gioco può trasformare concetti matematici astratti in esperienze spaziali coinvolgenti per gli studenti in India.'
                  : 'Orby’s Adventure successfully validated that game-based reinforcement can transform abstract mathematical concepts into engaging, spatial experiences for primary school students in India.'}
              </p>
              <p className="final-quote">
                {isIt
                  ? '"Unendo analisi dati, ricerca sul campo in India e design delle interazioni centrato sull’utente, questo progetto ha definito il mio approccio come Product Designer: creare esperienze digitali intuitive e accessibili basate su un impatto umano reale."'
                  : '"By combining data analysis, field research in India, and human-centered interaction design, this project defined my approach as a Product Designer: creating intuitive, accessible digital experiences grounded in real-world human impact."'}
              </p>

              <button onClick={handleBack} className="cs-back-home-btn">
                <ArrowLeft size={16} />
                <span>{isIt ? 'Torna al Portfolio' : 'Return to Portfolio'}</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="yco-footer">
        <div className="container yco-footer-container">
          <span>© {new Date().getFullYear()} Dario Saldamarco — Product Design Case Study. {isIt ? 'Tutti i diritti riservati.' : 'All rights reserved.'}</span>
          <a href="/">{isIt ? 'Torna al Portfolio Principale' : 'Back to Main Portfolio'}</a>
        </div>
      </footer>

      <style>{`
        .orby-cs-shell {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          position: relative;
        }

        .cs-nav-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--bg-glass-heavy);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          padding: 1.1rem 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .cs-nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cs-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .cs-back-btn:hover {
          color: var(--text-primary);
        }

        .cs-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
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
          background: none;
          border: none;
          cursor: pointer;
        }

        .lang-btn.active {
          color: var(--text-primary);
          font-weight: 700;
        }

        .lang-divider {
          color: var(--border-medium);
          font-size: 0.7rem;
        }

        .cs-nav-tag {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cs-main-body {
          padding-bottom: 6rem;
        }

        /* Hero */
        .cs-hero-section {
          padding-top: 4rem;
          padding-bottom: 3.5rem;
        }

        .hero-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }

        .cs-hero-title {
          font-size: clamp(3rem, 6.5vw, 4.8rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin-bottom: 0.75rem;
        }

        .cs-hero-subtitle {
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          color: var(--text-secondary);
          max-width: 780px;
          margin-bottom: 2.5rem;
          line-height: 1.45;
        }

        .cs-hero-meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.25rem;
          margin-bottom: 3rem;
        }

        .meta-card {
          padding: 1.25rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .meta-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .meta-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .cs-cover-frame {
          width: 100%;
          border-radius: var(--radius-xl);
          overflow: hidden;
          padding: 1rem;
        }

        .cs-cover-img {
          width: 100%;
          max-height: 680px;
          object-fit: contain;
          border-radius: var(--radius-lg);
          display: block;
        }

        /* Generic Section */
        .cs-section {
          padding: 4.5rem 0;
          border-top: 1px solid var(--border-subtle);
        }

        .cs-heading {
          font-size: clamp(2rem, 3.8vw, 2.85rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }

        .cs-paragraph {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .cs-lead-paragraph {
          font-size: 1.25rem;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 820px;
          margin-bottom: 2.25rem;
        }

        .cs-grid-two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }

        .cs-grid-two.align-center {
          align-items: center;
        }

        .cs-grid-three {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.75rem;
        }

        .cs-highlight-box {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
        }

        .box-title {
          font-size: 1.3rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .box-desc {
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        /* Cards Grid */
        .cs-cards-grid-4 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }

        .cs-card {
          padding: 1.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .card-icon {
          font-size: 1.75rem;
        }

        .cs-card h4 {
          font-size: 1.18rem;
          font-weight: 700;
        }

        .cs-card p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .cs-insight-quote {
          padding: 2rem 2.5rem;
          border-left: 4px solid #10b981;
          font-size: 1.15rem;
          font-style: italic;
          line-height: 1.65;
          color: var(--text-primary);
        }

        /* Client Brand Card */
        .client-brand-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.75rem;
        }

        .client-logo-img {
          width: 110px;
          height: 110px;
          border-radius: 26px;
          object-fit: cover;
        }

        .client-stats {
          display: flex;
          gap: 2.5rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-num {
          font-size: 2rem;
          font-weight: 700;
          color: #10b981;
        }

        .stat-lbl {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        /* Data Callout */
        .cs-data-callout {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          background: rgba(16, 185, 129, 0.04);
        }

        .alert-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #10b981;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .heatmap-summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
          margin-top: 0.5rem;
        }

        .heatmap-item {
          padding: 1.15rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .heatmap-item.lowest {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .heatmap-item.moderate {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .hm-label {
          font-weight: 700;
          font-size: 1rem;
        }

        .hm-value {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        /* Image Containers */
        .cs-image-single {
          padding: 1rem;
          border-radius: var(--radius-xl);
          overflow: hidden;
        }

        .cs-image-single img {
          width: 100%;
          max-height: 600px;
          object-fit: contain;
          border-radius: var(--radius-lg);
          display: block;
        }

        .cs-gallery-row.grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .cs-gallery-card {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cs-gallery-card img {
          width: 100%;
          max-height: 480px;
          object-fit: contain;
          border-radius: var(--radius-md);
        }

        .card-caption {
          padding: 0.75rem 0.5rem;
        }

        .card-caption h5 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }

        .card-caption p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Personas */
        .cs-persona-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .persona-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .persona-avatar {
          font-size: 2.5rem;
        }

        .persona-tag {
          font-size: 0.8rem;
          color: var(--accent-primary);
          font-weight: 600;
        }

        .persona-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .persona-list strong {
          color: var(--text-primary);
        }

        /* Process Stepper */
        .cs-process-stepper {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .step-card {
          padding: 1.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .step-num {
          font-size: 1.75rem;
          font-weight: 800;
          color: #10b981;
        }

        .step-card h4 {
          font-size: 1.15rem;
          font-weight: 700;
        }

        .step-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Features */
        .cs-feature-card {
          padding: 1.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .cs-feature-card h4 {
          font-size: 1.2rem;
          font-weight: 700;
        }

        .cs-feature-card p {
          font-size: 0.98rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .ui-pills-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-top: 1.5rem;
        }

        .ui-pill {
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.04);
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .ui-pill strong {
          color: var(--text-primary);
        }

        /* Field Photo Grid */
        .cs-field-photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.75rem;
          margin-top: 2rem;
        }

        .photo-card {
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .photo-card img {
          width: 100%;
          height: 230px;
          object-fit: cover;
          border-radius: var(--radius-md);
        }

        .photo-card span {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
          padding: 0 0.25rem;
        }

        .cs-insights-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .ins-item {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .ins-item strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 0.35rem;
        }

        /* Collab & Skills */
        .cs-collab-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .cs-collab-card h4 {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .cs-collab-card ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cs-collab-card li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.025rem;
          color: var(--text-secondary);
        }

        .cs-skills-checklist {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
          margin-top: 2rem;
        }

        .chk-item {
          padding: 1.15rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          font-size: 1rem;
          font-weight: 600;
        }

        /* Final Section */
        .cs-final-section {
          padding-top: 5rem;
          padding-bottom: 3rem;
        }

        .cs-final-card {
          padding: 3.5rem 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%);
        }

        .cs-final-card h2 {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 700;
        }

        .cs-final-card p {
          font-size: 1.2rem;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 800px;
        }

        .final-quote {
          font-style: italic;
          color: var(--text-primary) !important;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.5rem;
          margin-top: 0.5rem;
        }

        .cs-back-home-btn {
          margin-top: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 2.25rem;
          border-radius: var(--radius-full);
          background: #10b981;
          color: #ffffff;
          font-weight: 700;
          font-size: 1rem;
          transition: transform var(--transition-fast);
        }

        .cs-back-home-btn:hover {
          transform: translateY(-2px);
        }

        .margin-top {
          margin-top: 2.5rem;
        }

        .yco-footer {
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

        @media (max-width: 768px) {
          .cs-grid-two, .cs-gallery-row.grid-2 {
            grid-template-columns: 1fr;
          }
          .cs-hero-meta-grid {
            grid-template-columns: 1fr 1fr;
          }
          .cs-final-card {
            padding: 2.25rem 1.5rem;
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
