export interface CaseStudyData {
  overview: { it: string; en: string };
  problem: { it: string; en: string };
  solution: { it: string; en: string };
  focusAreas: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: { it: string; en: string };
  category: 'uxui' | 'game' | 'ios';
  role: string[];
  description: { it: string; en: string };
  focus: string[];
  accentColor: string;
  year: string;
  folderPath: string;
  appIcon: string;
  images: string[];
  caseStudy: CaseStudyData;
}

export const PROFILE = {
  name: 'Dario Saldamarco',
  role: 'UX/UI Designer',
  links: {
    email: 'dario.saldamarco@gmail.com',
    github: 'https://github.com/dsaldamarco',
    linkedin: 'https://www.linkedin.com/in/dario-saldamarco/',
    dribbble: 'https://dribbble.com/dardarius',
  },
};

export const PROJECTS: Project[] = [
  {
    id: 'you-can-only',
    title: 'You Can Only',
    subtitle: {
      it: 'Endless Hardcore Arcade Game',
      en: 'Endless Hardcore Arcade Game',
    },
    category: 'game',
    role: ['Game Designer', 'UX/UI Designer', 'Developer'],
    description: {
      it: 'You Can Only è un arcade ad alto ritmo basato su una regola semplice: ogni sfida ti dà una sola azione possibile. Tocca, scorri, tieni premuto, adattati e supera i tuoi limiti.',
      en: 'You Can Only is a fast-paced arcade game built around one simple rule: every challenge gives you only one possible action. Tap, swipe, hold, adapt, and push your limits.',
    },
    focus: ['Game Design', 'One-Touch Mechanics', 'Fast Arcade Loop', 'Tactile UX', 'Indie Development'],
    accentColor: '#f05123',
    year: '2026',
    folderPath: '/projects/you-can-only/',
    appIcon: '/projects/you-can-only/appicon-youcanonly.png',
    images: [
      '/projects/you-can-only/1yco.png',
      '/projects/you-can-only/2yco.png',
      '/projects/you-can-only/3yco.png',
      '/projects/you-can-only/4yco.png',
      '/projects/you-can-only/5yco.png',
      '/projects/you-can-only/6yco.png',
      '/projects/you-can-only/7yco.png',
    ],
    caseStudy: {
      overview: {
        it: 'You Can Only è un arcade game minimalista basato su una semplice regola: ogni sfida permette al giocatore di compiere una sola azione. Tap, swipe, hold e altre interazioni diventano strumenti per superare livelli sempre più imprevedibili, mettendo alla prova riflessi, precisione e capacità di adattamento. Il progetto nasce dall\'esplorazione di un concetto semplice ma difficile da padroneggiare: creare un\'esperienza immediata da comprendere, ma abbastanza profonda da incentivare il miglioramento continuo. Ho curato l\'intero processo, dalla definizione del gameplay loop alla progettazione UX/UI, fino allo sviluppo dell\'applicazione nativa iOS con Swift e SpriteKit.',
        en: 'You Can Only is a minimalist arcade game built around one simple rule: every challenge allows the player to perform only one action. Tap, swipe, hold, and other interactions become tools to master increasingly unpredictable levels, testing reflexes, precision, and adaptability. The project explores a simple yet challenging concept: creating an experience that is instantly intuitive to understand, yet deep enough to encourage continuous self-improvement. I led the entire end-to-end process, from gameplay loop definition to UX/UI design and native iOS development using Swift and SpriteKit.',
      },
      problem: {
        it: 'Creare un\'esperienza di gioco che fosse immediata da capire, abbastanza difficile da mantenere alta la motivazione e capace di trasformare il fallimento in un elemento positivo nel gameplay.',
        en: 'Designing a game experience that is instantly intuitive, challenging enough to sustain long-term engagement, and capable of transforming failure into a positive mechanic.',
      },
      solution: {
        it: 'Ho progettato un gameplay loop basato su tre principi: Learn → Fail → Improve. Ogni partita introduce una nuova sfida, il fallimento fornisce un feedback immediato e ogni tentativo permette al giocatore di migliorare le proprie abilità.',
        en: 'Designed a core gameplay loop grounded in three principles: Learn → Fail → Improve. Every run introduces a new challenge, failure delivers instant feedback, and each attempt empowers players to hone their skills.',
      },
      focusAreas: ['Game Design', 'UX/UI Design', 'Developer', 'Arcade Mechanics'],
    },
  },
  {
    id: 'orbys-adventure',
    title: "Orby's Adventure",
    subtitle: {
      it: 'Educational iPad Game',
      en: 'Educational iPad Game',
    },
    category: 'uxui',
    role: ['UX/UI Designer', 'Game Designer'],
    description: {
      it: 'Applicazione educativa per iPadOS progettata in collaborazione con The Akanksha Foundation (India) per supportare oltre 14.000 studenti nell’apprendimento della matematica attraverso un’esperienza ludica e spaziale.',
      en: 'Educational iPadOS application designed in collaboration with The Akanksha Foundation (India) to support 14,000+ students learning mathematics through a spatial, playful experience.',
    },
    focus: ['UX Research', 'Game Design', 'Educational Design', 'User Testing', 'Accessibility'],
    accentColor: '#10b981',
    year: '2026',
    folderPath: '/projects/orby/',
    appIcon: '/projects/orby/appicon-orby.png',
    images: [
      '/projects/orby/1orby.png',
      '/projects/orby/2orby.png',
      '/projects/orby/3orby.png',
      '/projects/orby/4orby.png',
      '/projects/orby/5orby.png',
      '/projects/orby/6orby.png',
      '/projects/orby/7orby.png',
      '/projects/orby/8orby.png',
      '/projects/orby/9orby.png',
      '/projects/orby/10orby.png',
    ],
    caseStudy: {
      overview: {
        it: 'Orby’s Adventure è un gioco educativo per iPad sviluppato all’interno del programma Apple Developer Academy PIER in collaborazione con The Akanksha Foundation. Il progetto nasce per affrontare il critico calo di rendimento in matematica degli studenti di 6ª classe nelle scuole in India. Attraverso l’analisi di dataset scolastici di 3 scuole e la ricerca utenti sul campo nelle classi di Pune, abbiamo progettato un’esperienza interattiva focalizzata sul consolidamento di concetti di ragionamento spaziale, frazioni e operazioni base.',
        en: 'Orby’s Adventure is an educational iPad game developed within the Apple Developer Academy PIER Program in direct collaboration with The Akanksha Foundation. Designed to address the critical Grade 6 math learning drop-off in Indian community schools, the product combines quantitative analysis of school performance datasets with on-site field user research in Pune classrooms. The experience transforms abstract spatial geometry, fractions, and basic operations into intuitive, gesture-first mini-games.',
      },
      problem: {
        it: 'L’analisi dei dati accademici ha evidenziato un forte calo di rendimento in 6ª classe (tasso di superamento medio 32.3%), causato dall’improvviso passaggio dall’aritmetica meccanica al ragionamento contestuale con testi in inglese.',
        en: 'Academic performance data revealed a steep drop-off at Grade 6 (32.3% average pass rate), driven by the sudden transition from rote arithmetic to contextual word problems in English.',
      },
      solution: {
        it: 'Interfaccia gesture-first priva di barriere di testo, onboarding visivo animato, suggerimenti progressivi e 5 moduli di consolidamento pratico guidato.',
        en: 'A gesture-first visual interface eliminating text barriers, animated visual onboarding, scaffolded hint systems, and 5 practice reinforcement modules.',
      },
      focusAreas: ['UX Research', 'Pune Field Testing', 'Game Design', 'Educational Design', 'Scaffolded Hints', 'Accessibility'],
    },
  },
  {
    id: 'melting-pot',
    title: 'Melting Pot',
    subtitle: {
      it: 'Cooperative iPhone Party Game',
      en: 'Cooperative iPhone Party Game',
    },
    category: 'game',
    role: ['Game Designer', 'UX/UI Designer'],
    description: {
      it: 'Melting Pot è un gioco cooperativo a ritmo serrato per iPhone. Raduna i tuoi amici, mescola ingredienti bizzarri e prepara pozioni selvagge in una cucina magica finita nel caos.',
      en: 'Melting Pot is a fast-paced cooperative shouting game for iPhone. Gather your friends, mix bizarre ingredients, and brew wild potions in a magical kitchen gone mad.',
    },
    focus: ['Party Game UX', 'Cooperative Interaction', 'Social Play', 'Motion UI', 'Audio Feedback'],
    accentColor: '#f59e0b',
    year: '2025',
    folderPath: '/projects/melting-pot/',
    appIcon: '/projects/melting-pot/appicon-meltingpot.png',
    images: [
      '/projects/melting-pot/1mp.png',
      '/projects/melting-pot/2mp.png',
      '/projects/melting-pot/3mp.png',
    ],
    caseStudy: {
      overview: {
        it: 'Un party game studiato per la condivisione dal vivo intorno allo stesso schermo dello smartphone.',
        en: 'A party game designed for physical social interaction around a shared iPhone screen.',
      },
      problem: {
        it: 'Facilitare l’interazione di gruppo immediata e l’intuitività delle regole durante le feste.',
        en: 'Enabling immediate group cooperation without requiring lengthy rule tutorials.',
      },
      solution: {
        it: 'Grafica ad alto contrasto, animazioni visive dinamiche e comandi vocali/tattili sincronizzati.',
        en: 'High-contrast energetic UI, playful animations, and voice/touch sync mechanics.',
      },
      focusAreas: ['Cooperative UX', 'Game Design', 'Party Ergonomics'],
    },
  },
  {
    id: 'synk',
    title: 'Synk',
    subtitle: {
      it: 'Creative Interaction App',
      en: 'Creative Interaction App',
    },
    category: 'ios',
    role: ['UX/UI Designer', 'iOS Developer'],
    description: {
      it: 'Synk è un’esperienza interattiva ludica che esplora la sinestesia, la connessione tra i sensi. Realizzata per lo Swift Student Challenge di Apple.',
      en: 'Synk is a playful interactive experience exploring synesthesia, the connection between senses. Built for Apple’s Swift Student Challenge.',
    },
    focus: ['Interaction Design', 'Synesthesia', 'Swift Student Challenge', 'Gesture Controls', 'Audio-Visual Sync'],
    accentColor: '#8b5cf6',
    year: '2025',
    folderPath: '/projects/synk/',
    appIcon: '/projects/synk/appicon-synk.png',
    images: [
      '/projects/synk/1synk.png',
      '/projects/synk/2synk.png',
      '/projects/synk/3synk.png',
    ],
    caseStudy: {
      overview: {
        it: 'Un’esplorazione sperimentale di come suono, colore e gesture tattili su iOS possano fondersi in un’unica sensazione percettiva.',
        en: 'An experimental exploration of how sound, color, and touch gestures on iOS merge into a unified sensory perception.',
      },
      problem: {
        it: 'Creare un’interfaccia che esprima la sinestesia senza risultare caotica o confusa per l’utente.',
        en: 'Designing a multisensory UI that captures synesthesia without creating visual or auditory overwhelm.',
      },
      solution: {
        it: 'Design minimale con risposte aptiche sincronizzate e sintesi visiva reattiva ai gesti delle dita.',
        en: 'Minimalist fluid UI with synchronized haptics and touch-reactive color synthesis.',
      },
      focusAreas: ['Interaction Design', 'Sensory UI', 'SwiftUI', 'Haptic Engineering'],
    },
  },
  {
    id: 'sortie',
    title: 'Sortie',
    subtitle: {
      it: 'Sleep Coaching iOS App',
      en: 'Sleep Coaching iOS App',
    },
    category: 'uxui',
    role: ['Product Designer'],
    description: {
      it: 'Sortie è un’applicazione di sleep coaching progettata sulla terapia di restrizione del sonno basata su evidenze scientifiche. L’esperienza unisce tracciamento della salute, guida personalizzata e integrazione nell’ecosistema Apple.',
      en: 'Sortie is a sleep coaching application designed around science-based sleep restriction therapy. The experience combines health tracking, personalized guidance and Apple ecosystem integration.',
    },
    focus: ['Health Experience', 'Apple Ecosystem', 'WatchOS Integration', 'Circadian Design', 'Behavioral Coaching'],
    accentColor: '#6366f1',
    year: '2025',
    folderPath: '/projects/sortie/',
    appIcon: '/projects/sortie/appicon-sortie.png',
    images: [
      '/projects/sortie/1sortie.png',
      '/projects/sortie/2sortie.png',
      '/projects/sortie/3sortie.png',
    ],
    caseStudy: {
      overview: {
        it: 'Un’applicazione pensata per accompagnare l’utente verso ritmi del sonno più sani senza l’ansia da notifiche o grafici complessi.',
        en: 'Designed to support healthy sleep rhythms through calm night-first interfaces and seamless watchOS integration.',
      },
      problem: {
        it: 'Molte app per il sonno sovraccaricano l’utente di dati e notifiche luminose prima di coricarsi.',
        en: 'Most sleep trackers bombard users with complex charts and bright screens right before bedtime.',
      },
      solution: {
        it: 'Palette notturna rilassante, complicazioni sintetiche su Apple Watch e consigli comportamentali graduali.',
        en: 'Ambient dark interface, glanceable Apple Watch complications, and evidence-based behavioral coaching.',
      },
      focusAreas: ['Product Design', 'Health UX', 'Apple Watch HIG', 'Dark Ergonomics'],
    },
  },
  {
    id: 'bookmarked',
    title: 'Bookmarked',
    subtitle: {
      it: 'Native iOS Reading Platform',
      en: 'Native iOS Reading Platform',
    },
    category: 'uxui',
    role: ['Product Designer', 'iOS Developer'],
    description: {
      it: 'Bookmarked è una piattaforma sociale per lettori ispirata a Letterboxd. Gli utenti possono scoprire, recensire e condividere esperienze letterarie attraverso un’interfaccia nativa iOS elegante e completa funzionalità offline.',
      en: 'Bookmarked is a social reading platform inspired by Letterboxd. Users can discover, review and share literary experiences through a polished native iOS experience with full offline functionality.',
    },
    focus: ['Social Reading Platform', 'iOS Native Architecture', 'Editorial Typography', 'Offline-First UI'],
    accentColor: '#14b8a6',
    year: '2025',
    folderPath: '/projects/bookmarked/',
    appIcon: '/projects/bookmarked/appicon-bookmarked.png',
    images: [
      '/projects/bookmarked/1book.png',
      '/projects/bookmarked/2book.png',
      '/projects/bookmarked/3book.png',
    ],
    caseStudy: {
      overview: {
        it: 'Una community visiva per amanti della lettura con schede libro editoriali e recensioni social.',
        en: 'A visual community for book lovers featuring editorial book covers and social review feeds.',
      },
      problem: {
        it: 'Le app tradizionali di lettura sono spesso datate, poco incentrate sulla tipografia e macchinose.',
        en: 'Existing reading tracking apps are visually dated, slow, and lack typography elegance.',
      },
      solution: {
        it: 'Design editoriale con tipografia pulita, layout dinamico a griglia e sincronizzazione offline immediata.',
        en: 'Editorial typography, responsive card layouts, and offline-first performance.',
      },
      focusAreas: ['Product Design', 'iOS Design', 'Editorial Layout', 'Offline Architecture'],
    },
  },
];

export const SKILL_CATEGORIES = {
  uxui: [
    'User Research',
    'User Personas',
    'Customer Journey',
    'User Flow',
    'Wireframing',
    'Interactive Prototyping',
    'High Fidelity Design',
    'Usability Testing',
    'Heuristic Evaluation',
    'Design Systems',
  ],
  product: [
    'Mobile App Design',
    'iOS Design',
    'Apple Human Interface Guidelines',
    'Game UX',
    'Educational Design',
    'Interaction Design',
    'Agile / Scrum Workflow',
  ],
  tools: [
    'Figma',
    'FigJam',
    'Miro',
    'Adobe Creative Suite',
    'Photoshop',
    'Premiere',
    'Keynote',
    'xCode',
    'Swift',
    'SwiftUI',
    'SpriteKit',
    'Git / GitHub',
    'Jira',
    'Notion',
    'Sprint Planning',
  ],
};
