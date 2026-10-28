import type { Lang } from '../data/projects';

export type Language = Lang;

const it = {
  skip: 'Vai al contenuto',
  nav: { work: 'Progetti', about: 'Chi sono', cv: 'Esperienza', contact: 'Scrivimi', home: 'Dario Saldamarco, torna alla home', lang: 'Lingua' },
  status: { open: 'Cerco un ruolo da UX/UI o product designer' },
  hero: {
    title: 'Dalla ricerca al prodotto finito.',
    intro:
      'Sono Dario Saldamarco, UX/UI designer. Seguo un prodotto digitale dall’inizio alla fine: ricerca con le persone, flussi, interfaccia e prototipi, fino allo sviluppo insieme al team.',
    cta: 'Guarda i progetti',
    email: 'Scrivimi una mail',
    apps: 'Le mie app: apri un progetto',
  },
  work: {
    featured: 'In evidenza',
    caseStudy: 'Leggi il case study',
    problem: 'Il problema',
    decision: 'Cosa ho deciso',
    result: 'Risultato',
    shipped: 'Pubblicato',
    appStore: 'Scarica sull’App Store',
    moreTitle: 'Altri progetti',
    moreIntro: 'Quattro app progettate tra il 2025 e il 2026, tra giochi, salute e lettura.',
    open: 'Apri',
  },
  about: {
    title: 'Come lavoro',
    letter: [
      'Vengo dalle arti visive: mi sono laureato in Nuove Tecnologie dell’Arte all’Accademia di Belle Arti di Napoli e ho lavorato come graphic designer per un festival, per brand e sui social.',
      'Ho studiato UX/UI con ILAS e dot Academy, poi all’Apple Developer Academy ho imparato a progettare per iOS e a sviluppare in SwiftUI, in team con sviluppatori e product owner.',
      'Il progetto che conta di più per me è Orby’s Adventure: i dati ci hanno detto dove gli studenti si bloccavano, la ricerca in classe a Pune ci ha detto perché.',
      'Unisco la cura visiva all’attenzione per chi userà il prodotto e alla conoscenza di come viene sviluppato: so cosa costa una scelta e posso provarla in un prototipo vero.',
    ],
    signoff: 'Dario',
    signrole: 'UX/UI designer',
  },
  cv: {
    title: 'Esperienza e formazione',
    experience: 'Esperienza',
    education: 'Formazione',
    skills: 'Competenze e strumenti',
    now: 'oggi',
  },
  contact: {
    title: 'Parliamone.',
    intro: 'Cerco un ruolo da UX/UI o product designer. Il modo più rapido per raggiungermi è la mail.',
    copy: 'Copia indirizzo',
    copied: 'Indirizzo copiato',
    elsewhere: 'Altrove',
    top: 'Torna su',
    rights: 'Progettato e sviluppato da Dario Saldamarco.',
  },
  cs: {
    back: 'Tutti i progetti',
    context: 'Contesto',
    problem: 'Il problema',
    role: 'Cosa ho fatto',
    process: 'Processo',
    decisions: 'Decisioni di design',
    beforeAfter: 'Prima e dopo il test in classe',
    research: 'Ricerca sul campo',
    outcome: 'Risultato',
    learnings: 'Cosa ho imparato',
    gallery: 'Schermate',
    next: 'Prossimo progetto',
    support: 'Supporto',
    privacy: 'Privacy',
    notFound: 'Questo progetto non esiste.',
  },
};

export type Translations = typeof it;

const en: Translations = {
  skip: 'Skip to content',
  nav: { work: 'Work', about: 'About', cv: 'Experience', contact: 'Email me', home: 'Dario Saldamarco, back to home', lang: 'Language' },
  status: { open: 'Looking for a UX/UI or product designer role' },
  hero: {
    title: 'From research to finished product.',
    intro:
      'I’m Dario Saldamarco, a UX/UI designer. I take a digital product from start to finish: research with people, flows, interface and prototypes, through to development with the team.',
    cta: 'See the work',
    email: 'Send me an email',
    apps: 'My apps: open a project',
  },
  work: {
    featured: 'Featured',
    caseStudy: 'Read the case study',
    problem: 'The problem',
    decision: 'What I decided',
    result: 'Outcome',
    shipped: 'Shipped',
    appStore: 'Download on the App Store',
    moreTitle: 'More projects',
    moreIntro: 'Four apps designed between 2025 and 2026, across games, health and reading.',
    open: 'Open',
  },
  about: {
    title: 'How I work',
    letter: [
      'I come from the visual arts: I studied New Technologies of Art at the Accademia di Belle Arti in Naples and worked as a graphic designer for a festival, for brands and on social channels.',
      'I studied UX/UI with ILAS and dot Academy, then at the Apple Developer Academy I learned to design for iOS and build in SwiftUI, in teams with developers and product owners.',
      'The project that matters most to me is Orby’s Adventure: the data told us where students got stuck, and classroom research in Pune told us why.',
      'I bring visual care together with attention to the people who will use the product and an understanding of how it gets built: I know what a choice costs and can try it in a real prototype.',
    ],
    signoff: 'Dario',
    signrole: 'UX/UI designer',
  },
  cv: {
    title: 'Experience and education',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills and tools',
    now: 'now',
  },
  contact: {
    title: 'Let’s talk.',
    intro: 'I’m looking for a UX/UI or product designer role. Email is the quickest way to reach me.',
    copy: 'Copy address',
    copied: 'Address copied',
    elsewhere: 'Elsewhere',
    top: 'Back to top',
    rights: 'Designed and built by Dario Saldamarco.',
  },
  cs: {
    back: 'All projects',
    context: 'Context',
    problem: 'The problem',
    role: 'What I did',
    process: 'Process',
    decisions: 'Design decisions',
    beforeAfter: 'Before and after classroom testing',
    research: 'Field research',
    outcome: 'Outcome',
    learnings: 'What I learned',
    gallery: 'Screens',
    next: 'Next project',
    support: 'Support',
    privacy: 'Privacy',
    notFound: 'This project does not exist.',
  },
};

export const TRANSLATIONS: Record<Language, Translations> = { it, en };
