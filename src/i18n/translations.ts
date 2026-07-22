export type Language = 'it' | 'en';

export interface EducationItem {
  institution: string;
  role: string;
  period: string;
  desc: string;
}

export interface Translations {
  nav: {
    about: string;
    work: string;
    experience: string;
    education: string;
    skills: string;
    contact: string;
  };
  hero: {
    role: string;
    headline: string;
    subtitle: string;
    ctaWork: string;
    ctaContact: string;
  };
  work: {
    title: string;
    subtitle: string;
    all: string;
    readStory: string;
    viewProject: string;
    focus: string;
    role: string;
  };
  about: {
    title: string;
    subtitle: string;
    headline: string;
    bioP1: string;
    bioP2: string;
    bioP3: string;
  };
  experience: {
    title: string;
    subtitle: string;
    items: {
      company: string;
      role: string;
      period: string;
      desc: string;
    }[];
  };
  education: {
    title: string;
    subtitle: string;
    items: EducationItem[];
  };
  skills: {
    title: string;
    subtitle: string;
    categories: {
      uxui: string;
      product: string;
      tools: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    copyEmail: string;
    emailCopied: string;
  };
  modal: {
    back: string;
    overview: string;
    challenge: string;
    solution: string;
    focusAreas: string;
    role: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  it: {
    nav: {
      about: 'Chi Sono',
      work: 'Progetti',
      experience: 'Esperienza',
      education: 'Formazione',
      skills: 'Competenze',
      contact: 'Contatti',
    },
    hero: {
      role: 'Dario Saldamarco — UX/UI Designer',
      headline: 'Trasformo idee complesse in esperienze digitali semplici e intuitive.',
      subtitle: 'Designer con background in UX/UI Design, Web Design, Multimedia e Game Design, focalizzato sulla progettazione di esperienze digitali intuitive, accessibili e coinvolgenti. Unisco ricerca utente, design thinking e prototipazione interattiva per creare prodotti digitali che bilanciano esigenze degli utenti, obiettivi di business e possibilità tecnologiche.',
      ctaWork: 'Esplora i Progetti',
      ctaContact: 'Contattami',
    },
    work: {
      title: 'Progetti Selezionati',
      subtitle: 'Una selezione di prodotti digitali progettati dalla ricerca alla realizzazione, tra app iOS, esperienze interattive e game design.',
      all: 'Tutti i Progetti',
      readStory: 'Leggi Caso Studio',
      viewProject: 'Vedi Dettagli',
      focus: 'Focus',
      role: 'Ruolo',
    },
    about: {
      title: 'Chi Sono',
      subtitle: 'Background & Approccio al Design',
      headline: 'Progetto esperienze digitali intuitive, accessibili e coinvolgenti.',
      bioP1: 'Sono Dario Saldamarco, UX/UI Designer con una formazione in Multimedia, Web Design e progettazione di prodotti digitali.',
      bioP2: 'Il mio percorso unisce ricerca utente, wireframing, sistemi di design e prototipazione per dare vita ad app e giochi che risolvono problemi reali e offrono esperienze d’uso fluide e memorabili.',
      bioP3: 'Grazie all’esperienza presso l’Apple Developer Academy e allo sviluppo di giochi indipendenti, unisco sensibilità visiva ed empatia per l’utente alla comprensione delle logiche di sviluppo.',
    },
    experience: {
      title: 'Esperienza Personale',
      subtitle: 'Percorso lavorativo nel design di prodotti digitali ed eventi',
      items: [
        {
          company: 'Apple Developer Academy — Pier Program',
          role: 'Game & UX/UI Designer',
          period: '2025 — 2026',
          desc: 'Progettato UX/UI, identità visiva e meccaniche di gioco di Orby’s Adventure, un gioco educativo per iPadOS rivolto a studenti di scuola primaria. Condotte attività di user research, usability testing e sessioni di co-design in India, coinvolgendo sia utenti finali che stakeholder durante tutto il processo di design, e iterando sull’esperienza in un ambiente Scrum.'
        },
        {
          company: 'Growing Greener',
          role: 'Digital Designer & Event Collaborator',
          period: '2023 — In corso',
          desc: 'Responsabile del supporto UX/UI per la progettazione e il miglioramento dei touchpoint digitali della community, con focus su chiarezza, coerenza visiva e user experience. Attivo nella gestione e facilitazione di eventi e iniziative, contribuendo alla crescita e all’engagement della community attraverso attività di coordinamento, contenuto e interazione diretta con i partecipanti.'
        },
        {
          company: 'Future Food',
          role: 'Facilitator & Mentor – Biodiversity Hackathon @ Innovation Village Naples',
          period: '2025',
          desc: 'Ho svolto il ruolo di mentor in un hackathon di 2 giorni sulla biodiversità, guidando diversi team nella definizione dei problemi, nella generazione e selezione delle idee e nella trasformazione dei concept in prototipi e presentazioni finali. Ho facilitato sessioni strutturate di design thinking e fornito feedback iterativi su UX, coerenza e fattibilità delle soluzioni.'
        },
        {
          company: 'VX Digital',
          role: 'Graphic Designer / Social Media Manager',
          period: '2023 — 2024',
          desc: 'Progettazione grafica per campagne social, gestione della presenza digitale e definizione di linee guida visive per brand.'
        },
        {
          company: '3f&Edin — Arena Flegrea',
          role: 'Graphic Designer',
          period: '2022 — 2023',
          desc: 'Progettazione e produzione di contenuti grafici per web e social media e materiali promozionali per il Noisy Naples Fest, seguendo l’adattamento visivo per diversi formati e canali. Collaborazione diretta con artisti musicali per la realizzazione di asset pubblicitari e materiali promozionali. Sviluppo di presentazioni analitiche, report informativi e contenuti video a supporto della comunicazione del festival.'
        }
      ],
    },
    education: {
      title: 'Formazione',
      subtitle: 'Percorso accademico e corsi di specializzazione in UX/UI e Product Design',
      items: [
        {
          institution: 'Apple Developer Academy @ Unina Federico II Pier Program',
          role: 'App Designer',
          period: '2026',
          desc: 'Ho lavorato in un team multidisciplinare seguendo un processo Agile Scrum, utilizzando strumenti come Jira per la gestione di sprint, backlog e attività progettuali. All’interno di un progetto sviluppato in collaborazione con un cliente internazionale del settore non-profit, ho partecipato alla definizione della strategia di prodotto e alla progettazione di soluzioni digitali orientate a un contesto educativo reale.\n\nHo seguito l’intero processo UX/UI end-to-end, dalla ricerca e analisi dei bisogni degli utenti alla definizione di user flow complessi, wireframe e prototipi ad alta fedeltà su Figma. Ho condotto attività di User Research e Usability Testing, raccogliendo insight direttamente dagli utenti e dagli stakeholder per iterare e migliorare l’esperienza progettata prima della fase produttiva.\n\nL’esperienza ha sviluppato competenze avanzate in collaborazione con clienti, comunicazione progettuale, gestione del feedback, problem solving e adattamento del design a contesti culturali e tecnologici differenti, lavorando alla creazione di prodotti digitali con impatto concreto.'
        },
        {
          institution: 'Apple Developer Academy @ Unina Federico II',
          role: 'iOS App Development & Design Program',
          period: '2025',
          desc: 'Percorso intensivo di progettazione e sviluppo di applicazioni native iOS basato su metodologie Agile, Design Thinking e Human-Centered Design. Ho lavorato in team multidisciplinari simulando un ambiente di sviluppo professionale, collaborando con designer, developer e product owner durante tutte le fasi del ciclo di vita del prodotto.\n\nHo gestito l’intero processo UX/UI Design end-to-end, dalla fase di user research e analisi dei bisogni alla definizione di personas, user flow e architetture informative, fino alla realizzazione di wireframe, mockup ad alta fedeltà e prototipi interattivi su Figma.\n\nHo applicato processi iterativi di ideazione, prototipazione e validazione attraverso usability testing, raccolta feedback e miglioramento continuo dell’esperienza utente, traducendo insight qualitativi in soluzioni di design concrete.\n\nHo collaborato alla progettazione di interfacce native seguendo le Human Interface Guidelines di Apple, adattando i concept ai principi di usabilità, accessibilità e coerenza visiva di SwiftUI e implementando soluzioni in ambiente Xcode.\n\nL’esperienza ha rafforzato competenze di problem solving, comunicazione, collaborazione cross-funzionale, gestione del feedback e capacità di trasformare un’idea in un prodotto digitale funzionante.'
        },
        {
          institution: 'dot Academy',
          role: 'Corso in UX / UI Design',
          period: '2023',
          desc: 'Percorso di specializzazione in User Experience e User Interface Design con focus sull’approccio User-Centered Design. Ho approfondito metodologie di ricerca e analisi dell’utente attraverso la creazione di User Persona, Customer Journey Map e User Flow, identificando bisogni, comportamenti e opportunità di miglioramento dell’esperienza digitale.\n\nHo progettato wireframe, mockup ad alta fedeltà e prototipi interattivi end-to-end su Figma, applicando principi di usabilità, design system e analisi euristica per individuare ed eliminare punti di frizione nei flussi. Il percorso ha incluso anche la definizione di architetture informative, iterazione dei concept e validazione delle soluzioni progettuali.'
        },
        {
          institution: 'ILAS Academy Napoli',
          role: 'Corso in Web design & UX/UI',
          period: '2022',
          desc: 'Percorso formativo incentrato sulla progettazione di interfacce digitali e sulla creazione di esperienze utente efficaci. Ho approfondito i principi di User Experience e User Interface Design, dalla ricerca e organizzazione dei contenuti fino alla progettazione di layout responsive. Ho acquisito competenze nell’utilizzo di strumenti come Figma e Adobe Creative Suite, sviluppando progetti web con attenzione a usabilità, accessibilità e comunicazione visiva.'
        },
        {
          institution: 'Accademia di Belle Arti di Napoli',
          role: "Laurea Triennale in Nuove Tecnologie dell'Arte",
          period: '2017 — 2021',
          desc: 'Studio della comunicazione visiva e multimediale, sviluppando problem solving creativo e attitudine al lavoro di squadra tramite progetti interattivi complessi.'
        }
      ]
    },
    skills: {
      title: 'Competenze & Strumenti',
      subtitle: 'Metodologie, conoscenze di prodotto e stack software',
      categories: {
        uxui: 'UX/UI Design',
        product: 'Product Design',
        tools: 'Tools & Technologies',
      },
    },
    contact: {
      title: 'Creiamo qualcosa insieme.',
      subtitle: 'Attualmente aperto a opportunità lavorative come UX/UI Designer e collaborazioni su prodotti digitali.',
      copyEmail: 'Copia Email',
      emailCopied: 'Email copiata negli appunti!',
    },
    modal: {
      back: 'Torna ai Progetti',
      overview: 'Panoramica del Progetto',
      challenge: 'La Sfida',
      solution: 'La Soluzione',
      focusAreas: 'Aree di Focus',
      role: 'Ruolo',
    },
  },
  en: {
    nav: {
      about: 'About',
      work: 'Selected Work',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      role: 'Dario Saldamarco — UX/UI Designer',
      headline: 'I transform complex ideas into simple, intuitive digital experiences.',
      subtitle: 'Designer with a background in UX/UI Design, Web Design, Multimedia, and Game Design, focused on crafting intuitive, accessible, and engaging digital experiences. I combine user research, design thinking, and interactive prototyping to create digital products that balance user needs, business goals, and technical feasibility.',
      ctaWork: 'Explore Projects',
      ctaContact: 'Get in Touch',
    },
    work: {
      title: 'Selected Work',
      subtitle: 'A curation of digital products designed from research to execution, across iOS apps, interactive experiences, and game design.',
      all: 'All Projects',
      readStory: 'Read Case Study',
      viewProject: 'View Details',
      focus: 'Focus',
      role: 'Role',
    },
    about: {
      title: 'About Me',
      subtitle: 'Background & Design Philosophy',
      headline: 'Designing intuitive, accessible, and engaging digital experiences.',
      bioP1: 'I am Dario Saldamarco, a UX/UI Designer with a background in Multimedia Design, Web Design, and digital product creation.',
      bioP2: 'My workflow combines user research, wireframing, design systems, and interactive prototyping to bring apps and games to life that solve real problems and deliver smooth user journeys.',
      bioP3: 'Through my experience at the Apple Developer Academy and indie game development, I combine strong visual craftsmanship and empathy for users with technical understanding.',
    },
    experience: {
      title: 'Personal Experience',
      subtitle: 'Professional work track record in digital product design',
      items: [
        {
          company: 'Apple Developer Academy — Pier Program',
          role: 'Game & UX/UI Designer',
          period: '2025 — 2026',
          desc: 'Designed UX/UI, visual identity, and game mechanics for Orby’s Adventure, an educational iPadOS game for primary school students. Conducted user research, usability testing, and co-design sessions in India, engaging end-users and stakeholders throughout the design process, and iterating on the experience within an Agile Scrum environment.'
        },
        {
          company: 'Growing Greener',
          role: 'Digital Designer & Event Collaborator',
          period: '2023 — Ongoing',
          desc: 'Responsible for UX/UI support in designing and improving community digital touchpoints, focusing on clarity, visual consistency, and user experience. Active in managing and facilitating events and initiatives, contributing to community growth and engagement through coordination, content, and direct interaction with participants.'
        },
        {
          company: 'Future Food',
          role: 'Facilitator & Mentor – Biodiversity Hackathon @ Innovation Village Naples',
          period: '2025',
          desc: 'Served as a mentor during a 2-day biodiversity hackathon, guiding multiple teams in problem definition, idea generation and selection, and converting concepts into final prototypes and presentations. Facilitated structured design thinking sessions and provided iterative feedback on UX, consistency, and feasibility of solutions.'
        },
        {
          company: 'VX Digital',
          role: 'Graphic Designer / Social Media Manager',
          period: '2023 — 2024',
          desc: 'Graphic design for social campaigns, digital media management, and visual brand guidelines.'
        },
        {
          company: '3f&Edin — Arena Flegrea',
          role: 'Graphic Designer',
          period: '2022 — 2023',
          desc: 'Design and production of graphic content for web, social media, and promotional material for Noisy Naples Fest, adapting visual formats across multiple channels. Direct collaboration with musical artists for advertising assets and promotional media. Development of analytical presentations, informative reports, and video content supporting festival communications.'
        }
      ],
    },
    education: {
      title: 'Education',
      subtitle: 'Academic background and specialized training in UX/UI & Product Design',
      items: [
        {
          institution: 'Apple Developer Academy @ Unina Federico II Pier Program',
          role: 'App Designer',
          period: '2026',
          desc: 'Worked in a multidisciplinary team following an Agile Scrum methodology, utilizing Jira for sprint planning, backlog management, and design deliverables. Within an international project developed alongside a non-profit client, I contributed to product strategy definition and designing digital solutions tailored for real-world educational impact.\n\nManaged the end-to-end UX/UI workflow, from user research and needs analysis to designing complex user flows, wireframes, and high-fidelity interactive Figma prototypes. Conducted User Research and Usability Testing, synthesizing qualitative insights from end-users and stakeholders to iteratively refine the UI prior to development.\n\nDeveloped advanced capabilities in client collaboration, design communication, feedback synthesis, creative problem solving, and adapting design systems to diverse technological and cultural contexts.'
        },
        {
          institution: 'Apple Developer Academy @ Unina Federico II',
          role: 'iOS App Development & Design Program',
          period: '2025',
          desc: 'Intensive native iOS app design and development program built upon Agile, Design Thinking, and Human-Centered Design methodologies. Collaborated within multidisciplinary teams simulating a professional product environment alongside designers, developers, and product owners.\n\nLed end-to-end UX/UI workflows: user research, personas, user flows, and information architecture, advancing through wireframing, high-fidelity mockups, and interactive Figma prototypes.\n\nApplied iterative prototyping and validation cycles using usability testing and feedback synthesis, translating user insights into tangible product features.\n\nDesigned native iOS user interfaces aligned with Apple Human Interface Guidelines, prioritizing accessibility, visual polish, and SwiftUI principles, implementing solutions within Xcode.\n\nStrengthened cross-functional team collaboration, design critique, problem solving, and bringing digital products from concept to launch.'
        },
        {
          institution: 'dot Academy',
          role: 'UX / UI Design Specialization',
          period: '2023',
          desc: 'Specialized training program in User Experience and User Interface Design focused on User-Centered Design principles. Mastered qualitative research methodologies including User Personas, Customer Journey Maps, and User Flows to uncover friction points and opportunities.\n\nDesigned wireframes, high-fidelity mockups, and end-to-end interactive prototypes in Figma, applying design systems, usability principles, and heuristic evaluations. Defined information architecture and validated iterative design concepts.'
        },
        {
          institution: 'ILAS Academy Napoli',
          role: 'Web Design & UX/UI Course',
          period: '2022',
          desc: 'Comprehensive training program centered on digital interface design and user experience fundamentals. Explored responsive web layouts, content structure, and visual storytelling. Built strong proficiency in Figma and Adobe Creative Suite while focusing on usability, accessibility, and visual aesthetics.'
        },
        {
          institution: 'Accademia di Belle Arti di Napoli',
          role: "Bachelor's Degree in New Technologies of Art",
          period: '2017 — 2021',
          desc: "Bachelor's Degree in New Technologies of Art focusing on visual communication, digital media, creative problem solving, and collaborative interactive projects."
        }
      ]
    },
    skills: {
      title: 'Skills & Toolkit',
      subtitle: 'Methodologies, product design capabilities, and tools',
      categories: {
        uxui: 'UX/UI Design',
        product: 'Product Design',
        tools: 'Tools & Technologies',
      },
    },
    contact: {
      title: "Let's build something together.",
      subtitle: 'Currently open for UX/UI Designer roles, digital product collaborations, and design team opportunities.',
      copyEmail: 'Copy Email',
      emailCopied: 'Email copied to clipboard!',
    },
    modal: {
      back: 'Back to Projects',
      overview: 'Project Overview',
      challenge: 'The Challenge',
      solution: 'The Solution',
      focusAreas: 'Focus Areas',
      role: 'Role',
    },
  },
};
