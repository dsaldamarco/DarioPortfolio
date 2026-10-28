export type Lang = 'it' | 'en';
export type L = Record<Lang, string>;

export interface Shot {
  src: string;
  alt: L;
  kind: 'phone' | 'tablet' | 'photo';
  w: number;
  h: number;
  caption?: L;
}

export interface Note {
  title: L;
  body: L;
  /** The option considered and set aside, when it is documented */
  alternative?: L;
}

export interface Fact {
  label: L;
  value: L;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  kind: L;
  summary: L;
  icon: string;
  /** Icons exported with transparent padding are scaled up to fill the squircle */
  iconInset?: boolean;
  facts: Fact[];
  context?: L;
  problem: L;
  evidence?: { figure: string; label: L }[];
  goal?: L;
  scope?: { yes: L[]; no: L[] };
  /** What Dario did himself */
  role: L[];
  /** What was done by or with the rest of the team */
  teamRole?: L[];
  /** Milestones: title is the month or phase */
  process?: Note[];
  decisions: Note[];
  beforeAfter?: { before: Shot; after: Shot; note: L };
  outcome?: L;
  learnings?: Note[];
  gallery: Shot[];
  research?: { intro: L; findings?: L[]; photos: Shot[] };
  links?: { appStore?: string; support?: string; privacy?: string };
}

export const PROFILE = {
  name: 'Dario Saldamarco',
  role: 'UX/UI Designer',
  city: 'Napoli',
  links: {
    email: 'dario.saldamarco@gmail.com',
    github: 'https://github.com/dsaldamarco',
    linkedin: 'https://www.linkedin.com/in/dario-saldamarco/',
    dribbble: 'https://dribbble.com/dardarius',
  },
  cv: {
    it: '/cv/Dario-Saldamarco-CV-IT.pdf',
    en: '/cv/Dario-Saldamarco-CV-EN.pdf',
  } as Record<Lang, string>,
};

const l = (it: string, en: string): L => ({ it, en });

const tablet = (src: string, alt: L, caption?: L): Shot => ({ src, alt, kind: 'tablet', w: 1600, h: 1199, caption });
const phone = (src: string, alt: L, w = 1200, h = 2420): Shot => ({ src, alt, kind: 'phone', w, h });
const photo = (src: string, alt: L, caption?: L): Shot => ({ src, alt, kind: 'photo', w: 1600, h: 1066, caption });

export const PROJECTS: Project[] = [
  {
    id: 'orbys-adventure',
    title: "Orby's Adventure",
    year: '2026',
    kind: l('Gioco educativo per iPad', 'Educational iPad game'),
    summary: l(
      'Un gioco per iPad che aiuta i ragazzi delle scuole medie Akanksha, in India, a esercitarsi su frazioni, rapporti e operazioni.',
      'An iPad game that helps Grade 6 students in Akanksha schools, India, practise fractions, ratios and basic operations.'
    ),
    icon: '/img/orby/icon.png',
    facts: [
      { label: l('Cliente', 'Client'), value: l('The Akanksha Foundation, India', 'The Akanksha Foundation, India') },
      { label: l('Il mio ruolo', 'My role'), value: l('Designer (UX/UI e game design), uno dei due del team', 'Designer (UX/UI and game design), one of two on the team') },
      { label: l('Team', 'Team'), value: l('7 persone: 2 designer, 1 project manager, 4 sviluppatori', '7 people: 2 designers, 1 project manager, 4 developers') },
      { label: l('Durata', 'Timeline'), value: l('Ottobre 2025 – giugno 2026', 'October 2025 – June 2026') },
      { label: l('Contesto', 'Setting'), value: l('Apple Developer Academy, PIER Program', 'Apple Developer Academy, PIER Program') },
      { label: l('Piattaforma', 'Platform'), value: l('iPadOS', 'iPadOS') },
      { label: l('Metodo e strumenti', 'Method and tools'), value: l('Scrum su Jira, Figma, TestFlight', 'Scrum on Jira, Figma, TestFlight') },
    ],
    context: l(
      'Akanksha è una non profit indiana nata nel 1991: gestisce 27 scuole a Mumbai, Pune e Nagpur, con circa 14.000 studenti di famiglie a basso reddito. La richiesta iniziale era un’app per iPad che aiutasse gli studenti delle medie con la geometria e il ragionamento spaziale.',
      'Akanksha is an Indian non-profit founded in 1991: it runs 27 schools in Mumbai, Pune and Nagpur, with about 14,000 students from low-income families. The initial brief was an iPad app to help middle-school students with geometry and spatial reasoning.'
    ),
    problem: l(
      'Prima di progettare abbiamo chiesto i dati: le prove di matematica di tre scuole, dalla terza elementare alla terza media, a inizio, metà e fine anno. In tutte e tre il calo arriva in prima media, quando la matematica smette di essere calcolo e diventa problemi da leggere e capire in inglese. Rapporti, proporzioni e percentuali sono gli argomenti più deboli, e tornano negli anni successivi.',
      'Before designing, we asked for data: maths assessments from three schools, Grades 3 to 8, at the start, middle and end of the year. In all three, results drop in Grade 6, when maths stops being calculation and becomes problems to read and understand in English. Ratio, proportion and percentage are the weakest topics, and they come back in later years.'
    ),
    evidence: [
      { figure: '32,3%', label: l('superano le prove su rapporti e proporzioni', 'pass rate on ratio and proportion') },
      { figure: '38,2%', label: l('superano le prove su frazioni e geometria', 'pass rate on fractions and geometry') },
      { figure: '58,4%', label: l('superano le prove sulle operazioni base', 'pass rate on basic operations') },
    ],
    goal: l(
      'Un gioco per esercitarsi, non per insegnare: far ripassare in autonomia, fuori dalla lezione, gli argomenti che gli studenti hanno già visto in classe, finché diventano sicuri.',
      'A game for practice, not for teaching: let students revise on their own, outside lessons, the topics they have already seen in class, until they feel confident.'
    ),
    scope: {
      yes: [
        l('Pratica e ripetizione su argomenti già spiegati dagli insegnanti', 'Practice and repetition on topics teachers have already explained'),
        l('Gioco visivo e interattivo, con pochissimo testo', 'A visual, interactive game with very little text'),
        l('Un’area mirata, scelta dai dati', 'One targeted area, chosen from the data'),
        l('Uso autonomo, a complemento della lezione', 'Independent use, alongside teaching'),
      ],
      no: [
        l('Insegnare gli argomenti da zero', 'Teaching topics from scratch'),
        l('Sostituire gli strumenti già usati a scuola', 'Replacing the tools schools already use'),
        l('Coprire tutto il programma di matematica', 'Covering the whole maths curriculum'),
        l('Diventare lo strumento principale in classe', 'Becoming the main classroom tool'),
      ],
    },
    role: [
      l('Ho progettato l’interfaccia e l’identità visiva del gioco, dai flussi ai prototipi ad alta fedeltà in Figma.', 'Designed the game’s interface and visual identity, from flows to high-fidelity Figma prototypes.'),
      l('Ho progettato le meccaniche di gioco, in modo che ogni gesto corrisponda al ragionamento matematico.', 'Designed the game mechanics so that each gesture matches the mathematical reasoning.'),
      l('A Pune ho condotto test di usabilità con studenti delle medie, osservazioni in classe e attività di co-design sullo storytelling.', 'In Pune, ran usability tests with Grade 6–8 students, classroom observation and storytelling co-design activities.'),
      l('Ho trasformato quello che abbiamo visto in classe in modifiche concrete a onboarding, aiuti e struttura dei livelli.', 'Turned what we saw in class into concrete changes to onboarding, hints and level structure.'),
    ],
    teamRole: [
      l('Analisi dei dati delle tre scuole e scelta della prima media come punto di intervento.', 'Analysis of the three schools’ data and the choice of Grade 6 as the point of intervention.'),
      l('Obiettivi, perimetro e roadmap, con la project manager e il cliente.', 'Goals, scope and roadmap, with the project manager and the client.'),
      l('Sviluppo dell’app in SwiftUI e SpriteKit, fatto dai quattro sviluppatori; io lavoravo con loro sulla fattibilità di gesti e animazioni.', 'App development in SwiftUI and SpriteKit by the four developers; I worked with them on the feasibility of gestures and animation.'),
      l('Sprint Scrum di due settimane su Jira e revisioni periodiche con i responsabili educativi di Akanksha.', 'Two-week Scrum sprints on Jira and regular reviews with Akanksha’s education leads.'),
    ],
    process: [
      { title: l('Ottobre', 'October'), body: l('Concept approvato dal cliente, sulla base dell’analisi dei dati e dei bisogni.', 'Concept approved by the client, based on the data analysis and needs.') },
      { title: l('Dicembre', 'December'), body: l('Primo prototipo interattivo, per validare meccaniche e approccio di gioco prima dei contenuti.', 'First interactive prototype, to validate mechanics and the game approach before the content.') },
      { title: l('Febbraio', 'February'), body: l('Prima release giocabile: una porzione della storia, per provare il ciclo di gioco e gli esercizi.', 'First playable release: a slice of the story, to test the game loop and the exercises.') },
      { title: l('Marzo', 'March'), body: l('Test a Pune con studenti e insegnanti; in parallelo lo sviluppo dell’MVP.', 'Testing in Pune with students and teachers; MVP development in parallel.') },
      { title: l('Aprile', 'April'), body: l('Seconda versione con le correzioni emerse a Pune e primi test con il cliente.', 'Second version with the fixes found in Pune, and the first client tests.') },
      { title: l('Maggio', 'May'), body: l('Nuove versioni in test su TestFlight: onboarding, aiuti, rifiniture dell’interfaccia e stabilità.', 'New test versions on TestFlight: onboarding, hints, interface polish and stability.') },
      { title: l('Giugno', 'June'), body: l('Stabilizzazione, correzione dei bug e consegna finale.', 'Stabilisation, bug fixing and final delivery.') },
    ],
    decisions: [
      {
        title: l('Esercitarsi, non studiare', 'Practice, not lessons'),
        body: l(
          'Nelle scuole Akanksha gli studenti usano già Khan Academy, Khanmigo, Mindspark, EDpuzzle e RAZ: strumenti che spiegano bene, ma fanno esercitare poco. Abbiamo scelto un gioco di ripasso che si affianca a loro.',
          'Akanksha students already use Khan Academy, Khanmigo, Mindspark, EDpuzzle and RAZ: tools that explain well but give little practice. We chose a practice game that sits alongside them.'
        ),
        alternative: l('Un’altra app di lezioni, in concorrenza con quelle già in uso.', 'Another lesson app, competing with the ones already in use.'),
      },
      {
        title: l('Un punto preciso invece di tutto il programma', 'One precise point instead of the whole curriculum'),
        body: l(
          'I dati indicavano la prima media e tre argomenti. Concentrarsi lì rendeva l’intervento più efficace ed evitava di inseguire aggiornamenti continui su tutto il programma.',
          'The data pointed to Grade 6 and three topics. Focusing there made the intervention more effective and avoided chasing constant updates across the whole curriculum.'
        ),
        alternative: l('La geometria per tutte le medie, come nella richiesta iniziale.', 'Geometry across all middle-school grades, as in the initial brief.'),
      },
      {
        title: l('Istruzioni mostrate, non scritte', 'Instructions shown, not written'),
        body: l(
          'A Pune gli studenti faticavano più a capire le regole dei minigiochi che a fare i conti, e il problema con l’inglese era di vocabolario, non di lettura. Abbiamo sostituito il testo con animazioni che mostrano il gesto da fare.',
          'In Pune, students struggled more to understand the mini-games’ rules than to do the maths, and their difficulty with English was vocabulary, not reading. We replaced the text with animations that show the gesture to make.'
        ),
      },
      {
        title: l('Aiuti a gradini invece di giusto o sbagliato', 'Step-by-step hints instead of right or wrong'),
        body: l(
          'Gli insegnanti chiedevano spiegazioni, non verdetti. L’Oracolo dà indizi visivi progressivi e lascia allo studente l’ultimo passo.',
          'Teachers asked for explanations, not verdicts. The Oracle gives progressive visual hints and leaves the last step to the student.'
        ),
        alternative: l('Una semplice verifica corretto/errato.', 'A simple right/wrong check.'),
      },
      {
        title: l('Prima le basi, un concetto per volta', 'Foundations first, one concept at a time'),
        body: l(
          'Insegnanti e cliente ci hanno chiesto di includere i prerequisiti e di non mescolare gli argomenti. Il gioco è diventato cinque aree con difficoltà crescente: rapporti, proporzioni, operazioni base, frazioni e problemi. Così serve anche in seconda e terza media.',
          'Teachers and the client asked us to include prerequisites and not to mix topics. The game became five areas of rising difficulty: ratio, proportion, basic operations, fractions and word problems. That makes it useful in Grades 7 and 8 too.'
        ),
        alternative: l('Solo rapporti e proporzioni della prima media, argomenti mescolati nello stesso livello.', 'Only Grade 6 ratio and proportion, with topics mixed in the same level.'),
      },
      {
        title: l('Il gesto è il ragionamento', 'The gesture is the reasoning'),
        body: l(
          'Ogni meccanica riproduce il ragionamento matematico: per capire 3/4 si trascina il fiore con tre petali colorati su quattro nel vaso giusto.',
          'Every mechanic mirrors the maths: to understand 3/4 you drag the flower with three of four petals coloured into the right pot.'
        ),
      },
    ],
    beforeAfter: {
      before: photo('/img/orby/testing1.jpg', l('Uno studente gioca al minigioco delle frazioni su iPad durante un test a Pune, mentre un membro del team cronometra la sessione', 'A student plays the fractions mini-game on an iPad during a test in Pune while a team member times the session')),
      after: tablet('/img/orby/5orby.jpg', l('Il minigioco delle frazioni nella versione illustrata: fiori con petali colorati da abbinare ai vasi 5/6, 2/3 e 3/4, e il pulsante per chiedere aiuto all’Oracolo', 'The illustrated fractions mini-game: flowers with coloured petals to match to pots labelled 5/6, 2/3 and 3/4, with a button to ask the Oracle for help')),
      note: l(
        'A sinistra, il prototipo durante un test in classe: le istruzioni sono una frase in inglese in cima allo schermo. A destra, la versione illustrata dello stesso minigioco, quasi senza testo e con l’aiuto dell’Oracolo.',
        'Left, the prototype in a classroom test: the instructions are an English sentence at the top of the screen. Right, the illustrated version of the same mini-game, almost without text and with the Oracle’s help.'
      ),
    },
    outcome: l(
      'A Pune il concept è stato validato: gli studenti volevano continuare a giocare e gli insegnanti lo hanno riconosciuto come strumento di ripasso. Abbiamo anche osservato che rigiocare migliorava i risultati e la sicurezza degli studenti. Quello che è emerso ha cambiato onboarding, aiuti e struttura dei contenuti, fino alla consegna del prodotto finale a giugno.',
      'In Pune the concept was validated: students wanted to keep playing and teachers saw it as a practice tool. We also saw that replaying improved students’ results and confidence. What we learned reshaped onboarding, hints and content structure, through to the final product delivered in June.'
    ),
    learnings: [
      {
        title: l('I dati dicono dove, il campo dice perché', 'Data says where, the field says why'),
        body: l('I grafici ci hanno indicato la prima media; solo stare in aula ci ha mostrato che il problema erano le istruzioni e il vocabolario.', 'The charts pointed at Grade 6; only being in the classroom showed us the problem was instructions and vocabulary.'),
      },
      {
        title: l('Il perimetro è una decisione di design', 'Scope is a design decision'),
        body: l('Dire cosa il prodotto non fa ci ha permesso di farlo bene, e di spiegarlo al cliente.', 'Saying what the product would not do let us do it well, and explain it to the client.'),
      },
      {
        title: l('Sbagliare deve far andare avanti', 'Mistakes should move you forward'),
        body: l('Un’interfaccia educativa costruisce fiducia guidando, non punendo l’errore.', 'An educational interface builds confidence by guiding, not by punishing the mistake.'),
      },
    ],
    gallery: [
      tablet('/img/orby/1orby.jpg', l('Schermata iniziale di Orby’s Adventure con il personaggio su un sentiero sospeso', 'Orby’s Adventure start screen with the character on a floating path')),
      tablet('/img/orby/2orby.jpg', l('La mappa del gioco: un percorso a caselle tra cascate e una fortezza, con il dado da tirare', 'The game map: a path of tiles past waterfalls and a fortress, with a dice to roll')),
      tablet('/img/orby/3orby.jpg', l('Schermata di selezione dei minigiochi', 'Mini-game selection screen')),
      tablet('/img/orby/4orby.jpg', l('Componenti dell’interfaccia e sistema visivo del gioco', 'Interface components and visual system of the game')),
      tablet('/img/orby/6orby.jpg', l('Minigioco sulle operazioni base', 'Basic operations mini-game')),
      tablet('/img/orby/7orby.jpg', l('Schermata di gioco', 'Gameplay screen')),
      tablet('/img/orby/8orby.jpg', l('Schermata di gioco', 'Gameplay screen')),
      tablet('/img/orby/9orby.jpg', l('Fine sezione: elemento Acqua completato, il prossimo è il Fuoco', 'Section finished: Water element complete, Fire is next')),
      tablet('/img/orby/10orby.jpg', l('Certificato finale di padronanza dei quattro elementi', 'Final certificate for mastering the four elements')),
    ],
    research: {
      intro: l(
        'A marzo siamo andati a Pune: presentazioni a presidi e insegnanti, test di usabilità con studenti delle medie, osservazioni in classe, attività di co-design e incontri con il cliente.',
        'In March we went to Pune: presentations to principals and teachers, usability tests with Grade 6–8 students, classroom observation, co-design activities and client meetings.'
      ),
      findings: [
        l('Gli studenti faticavano più con le regole e le istruzioni dei minigiochi che con la matematica.', 'Students struggled more with the mini-games’ rules and instructions than with the maths.'),
        l('La difficoltà con l’inglese era di vocabolario e contesto, non di velocità di lettura.', 'The difficulty with English was vocabulary and context, not reading speed.'),
        l('Gli insegnanti volevano aiuti che spiegano, non solo giusto o sbagliato.', 'Teachers wanted hints that explain, not just right or wrong.'),
        l('Mescolare più argomenti confondeva; serviva una progressione graduale.', 'Mixing topics confused students; they needed a gradual progression.'),
        l('Rigiocare aiutava: risultati e sicurezza miglioravano nel tempo.', 'Replaying helped: results and confidence improved over time.'),
      ],
      photos: [
        photo('/img/orby/testing2.jpg', l('Workshop di co-design e storytelling a Pune', 'Co-design and storytelling workshop in Pune'), l('Co-design e storytelling', 'Co-design and storytelling')),
        photo('/img/orby/testing3.jpg', l('Allineamento con i docenti a Pune', 'Alignment with teachers in Pune'), l('Allineamento con i docenti', 'Aligning with teachers')),
        photo('/img/orby/testing4.jpg', l('Osservazione delle interazioni con i gesti su iPad', 'Observing gesture interactions on iPad'), l('Osservare i gesti', 'Observing gestures')),
        photo('/img/orby/testing5.jpg', l('Test con i docenti', 'Testing with teachers'), l('Test con i docenti', 'Testing with teachers')),
        photo('/img/orby/testing6.jpg', l('Sessione di feedback a Pune', 'Feedback session in Pune'), l('Sessione di feedback', 'Feedback session')),
      ],
    },
  },
  {
    id: 'you-can-only',
    title: 'You Can Only',
    year: '2026',
    kind: l('Gioco arcade per iPhone', 'Arcade game for iPhone'),
    summary: l(
      'Un arcade in cui ogni sfida ti concede una sola azione: toccare, scorrere o tenere premuto. Ho curato tutto, dal gameplay allo sviluppo in Swift, ed è sull’App Store.',
      'An arcade game where every challenge allows a single action: tap, swipe or hold. I did all of it, from gameplay to Swift development, and it is on the App Store.'
    ),
    icon: '/img/you-can-only/icon.png',
    facts: [
      { label: l('Il mio ruolo', 'My role'), value: l('Game design, UX/UI e sviluppo iOS', 'Game design, UX/UI and iOS development') },
      { label: l('Piattaforma', 'Platform'), value: l('iPhone', 'iPhone') },
      { label: l('Strumenti', 'Tools'), value: l('Swift, SpriteKit, Xcode', 'Swift, SpriteKit, Xcode') },
      { label: l('Stato', 'Status'), value: l('Pubblicato sull’App Store', 'Live on the App Store') },
    ],
    problem: l(
      'Volevo un gioco che si capisse in un secondo, restasse abbastanza difficile da far venire voglia di riprovare e trasformasse il fallimento in parte del divertimento.',
      'I wanted a game you understand in a second, that stays hard enough to make you try again, and that turns failing into part of the fun.'
    ),
    role: [
      l('Ho definito la regola, il ciclo di gioco e la curva di difficoltà.', 'Defined the rule, the game loop and the difficulty curve.'),
      l('Ho progettato interfaccia, feedback e tipografia.', 'Designed the interface, feedback and typography.'),
      l('Ho sviluppato l’app nativa in Swift e SpriteKit.', 'Built the native app in Swift and SpriteKit.'),
      l('L’ho pubblicata sull’App Store, con pagine di supporto e privacy.', 'Shipped it to the App Store, with support and privacy pages.'),
    ],
    decisions: [
      {
        title: l('La regola è il tutorial', 'The rule is the tutorial'),
        body: l(
          'Non c’è un tutorial: ogni sfida scrive a schermo il verbo che ti è concesso (“you can only hide”). Leggi una parola e sai cosa fare.',
          'There is no tutorial: each challenge writes the one verb you are allowed on screen (“you can only hide”). You read one word and know what to do.'
        ),
      },
      {
        title: l('Impara, sbaglia, migliora', 'Learn, fail, improve'),
        body: l(
          'Ogni partita introduce una sfida nuova, l’errore dà un feedback immediato e si riparte subito: il fallimento diventa il modo di imparare.',
          'Every run introduces a new challenge, a mistake gives instant feedback and you restart straight away: failing becomes how you learn.'
        ),
      },
    ],
    outcome: l('Il gioco è disponibile sull’App Store per iPhone.', 'The game is available on the App Store for iPhone.'),
    gallery: [1, 2, 3, 4, 5, 6, 7].map((n) =>
      phone(`/img/you-can-only/${n}yco.jpg`, l(`You Can Only, schermata ${n} di 7`, `You Can Only, screen ${n} of 7`), 647, 1400)
    ),
    links: {
      appStore: 'https://apps.apple.com/it/app/youcanonly/id6755528500',
      support: '/you-can-only/support',
      privacy: '/you-can-only/privacy',
    },
  },
  {
    id: 'melting-pot',
    title: 'Melting Pot',
    year: '2025',
    kind: l('Party game cooperativo per iPhone', 'Co-op party game for iPhone'),
    summary: l(
      'Un party game cooperativo da giocare in gruppo intorno a un solo iPhone: si mescolano ingredienti assurdi e si preparano pozioni in una cucina magica nel caos.',
      'A co-op party game played as a group around one iPhone: you mix absurd ingredients and brew potions in a magical kitchen gone wild.'
    ),
    icon: '/img/melting-pot/icon.png',
    facts: [
      { label: l('Il mio ruolo', 'My role'), value: l('Game designer e UX/UI designer', 'Game designer and UX/UI designer') },
      { label: l('Piattaforma', 'Platform'), value: l('iPhone', 'iPhone') },
    ],
    problem: l(
      'Far collaborare un gruppo da subito, durante una festa, senza dover spiegare lunghe regole.',
      'Get a group cooperating straight away, at a party, without explaining long rules.'
    ),
    role: [
      l('Ho progettato le meccaniche cooperative e l’interfaccia di gioco.', 'Designed the co-op mechanics and the game interface.'),
    ],
    decisions: [
      {
        title: l('Leggibile da tutto il gruppo', 'Readable by the whole group'),
        body: l(
          'Grafica ad alto contrasto e animazioni vivaci, pensate per uno schermo guardato da più persone insieme.',
          'High-contrast graphics and lively animation, made for one screen watched by several people at once.'
        ),
      },
      {
        title: l('Voce e tocco insieme', 'Voice and touch together'),
        body: l('Comandi vocali e tattili sincronizzati, così il gioco passa anche per la conversazione.', 'Synchronised voice and touch controls, so the game also runs through conversation.'),
      },
    ],
    gallery: [1, 2, 3].map((n) => phone(`/img/melting-pot/${n}mp.png`, l(`Melting Pot, schermata ${n} di 3`, `Melting Pot, screen ${n} of 3`), 597, 1200)),
  },
  {
    id: 'synk',
    title: 'Synk',
    year: '2025',
    kind: l('Esperienza interattiva per iPhone', 'Interactive iPhone experience'),
    summary: l(
      'Un’esperienza interattiva sulla sinestesia, il legame tra i sensi, realizzata per lo Swift Student Challenge di Apple.',
      'An interactive experience about synesthesia, the link between senses, built for Apple’s Swift Student Challenge.'
    ),
    icon: '/img/synk/icon.png',
    facts: [
      { label: l('Il mio ruolo', 'My role'), value: l('UX/UI designer e sviluppatore iOS', 'UX/UI designer and iOS developer') },
      { label: l('Contesto', 'Setting'), value: l('Swift Student Challenge', 'Swift Student Challenge') },
      { label: l('Strumenti', 'Tools'), value: l('SwiftUI', 'SwiftUI') },
    ],
    problem: l(
      'Far percepire la sinestesia con suono, colore e tocco senza un’interfaccia caotica o che sovraccarichi i sensi.',
      'Convey synesthesia through sound, colour and touch without an interface that feels chaotic or overwhelming.'
    ),
    role: [l('Ho progettato e sviluppato l’esperienza in SwiftUI.', 'Designed and built the experience in SwiftUI.')],
    decisions: [
      {
        title: l('Poco a schermo, molto al tatto', 'Little on screen, a lot under the finger'),
        body: l(
          'Interfaccia minimale, con risposte aptiche sincronizzate e colori che reagiscono al gesto delle dita.',
          'A minimal interface, with synchronised haptics and colours that react to the finger’s gesture.'
        ),
      },
    ],
    gallery: [1, 2, 3].map((n) => phone(`/img/synk/${n}synk.png`, l(`Synk, schermata ${n} di 3`, `Synk, screen ${n} of 3`), 580, 1200)),
  },
  {
    id: 'sortie',
    title: 'Sortie',
    year: '2025',
    kind: l('App di sleep coaching per iPhone', 'Sleep coaching app for iPhone'),
    summary: l(
      'Un’app di sleep coaching basata sulla terapia di restrizione del sonno, con tracciamento della salute, consigli personalizzati e integrazione con Apple Watch.',
      'A sleep coaching app built on sleep restriction therapy, with health tracking, personal guidance and Apple Watch integration.'
    ),
    icon: '/img/sortie/icon.png',
    iconInset: true,
    facts: [
      { label: l('Il mio ruolo', 'My role'), value: l('Product designer', 'Product designer') },
      { label: l('Piattaforma', 'Platform'), value: l('iPhone e Apple Watch', 'iPhone and Apple Watch') },
    ],
    problem: l(
      'Molte app per il sonno riempiono di grafici e notifiche luminose proprio prima di dormire.',
      'Many sleep apps fill the screen with charts and bright notifications right before bed.'
    ),
    role: [l('Ho progettato l’esperienza su iPhone e Apple Watch.', 'Designed the experience across iPhone and Apple Watch.')],
    decisions: [
      {
        title: l('Un’interfaccia per la notte', 'An interface for the night'),
        body: l('Fondo scuro e una palette calma, per non accendere lo schermo in faccia prima di dormire.', 'A dark ground and a calm palette, so the screen does not glare at you before sleep.'),
      },
      {
        title: l('Una occhiata dal polso', 'A glance from the wrist'),
        body: l('Complicazioni sintetiche su Apple Watch e consigli graduali, invece di grafici da studiare.', 'Concise Apple Watch complications and gradual advice, instead of charts to study.'),
      },
    ],
    gallery: [1, 2, 3].map((n) => phone(`/img/sortie/${n}sortie.png`, l(`Sortie, schermata ${n} di 3`, `Sortie, screen ${n} of 3`), 594, 1200)),
  },
  {
    id: 'bookmarked',
    title: 'Bookmarked',
    year: '2025',
    kind: l('Social di lettura per iPhone', 'Social reading app for iPhone'),
    summary: l(
      'Una piattaforma sociale per lettori ispirata a Letterboxd: si scoprono, recensiscono e condividono libri in un’app nativa iOS che funziona anche offline.',
      'A social platform for readers inspired by Letterboxd: discover, review and share books in a native iOS app that also works offline.'
    ),
    icon: '/img/bookmarked/icon.png',
    iconInset: true,
    facts: [
      { label: l('Il mio ruolo', 'My role'), value: l('Product designer e sviluppatore iOS', 'Product designer and iOS developer') },
      { label: l('Piattaforma', 'Platform'), value: l('iPhone', 'iPhone') },
    ],
    problem: l(
      'Le app per tenere traccia delle letture sono spesso datate, lente e poco curate nella tipografia.',
      'Reading-tracker apps are often dated, slow and careless with typography.'
    ),
    role: [l('Ho progettato il prodotto e contribuito allo sviluppo iOS.', 'Designed the product and contributed to the iOS build.')],
    decisions: [
      {
        title: l('Il libro al centro', 'The book at the centre'),
        body: l('Schede libro editoriali, con copertina e tipografia in primo piano, dentro i pattern nativi di iOS.', 'Editorial book pages with the cover and type up front, inside native iOS patterns.'),
      },
      {
        title: l('Offline prima di tutto', 'Offline first'),
        body: l('Sincronizzazione locale immediata, perché si legge anche dove non c’è rete.', 'Instant local sync, because people read where there is no signal.'),
      },
    ],
    gallery: [1, 2, 3].map((n) => phone(`/img/bookmarked/${n}book.png`, l(`Bookmarked, schermata ${n} di 3`, `Bookmarked, screen ${n} of 3`), 594, 1200)),
  },
];

export const getProject = (id: string) => PROJECTS.find((p) => p.id === id);

export interface CvItem {
  years: string;
  role: L;
  org: string;
  note: L;
}

export const EXPERIENCE: CvItem[] = [
  {
    years: '2023–oggi',
    role: l('Digital designer e collaboratore eventi', 'Digital designer and events collaborator'),
    org: 'Growing Greener',
    note: l('Supporto UX/UI ai canali digitali della community e facilitazione di eventi.', 'UX/UI support for the community’s digital channels, and event facilitation.'),
  },
  {
    years: '2025–2026',
    role: l('Game e UX/UI designer', 'Game and UX/UI designer'),
    org: 'Apple Developer Academy, PIER Program',
    note: l(
      'UX/UI, identità visiva e meccaniche di Orby’s Adventure; ricerca, test di usabilità e co-design in India con studenti e insegnanti; lavoro in Scrum.',
      'UX/UI, visual identity and mechanics for Orby’s Adventure; research, usability testing and co-design in India with students and teachers; Scrum.'
    ),
  },
  {
    years: '2025',
    role: l('Facilitatore e mentor, hackathon sulla biodiversità', 'Facilitator and mentor, biodiversity hackathon'),
    org: 'Future Food, Innovation Village Napoli',
    note: l(
      'Due giorni a guidare i team dalla definizione del problema al prototipo, con sessioni di design thinking e feedback su UX e fattibilità.',
      'Two days guiding teams from problem definition to prototype, with design thinking sessions and feedback on UX and feasibility.'
    ),
  },
  {
    years: '2023–2024',
    role: l('Graphic designer e social media manager', 'Graphic designer and social media manager'),
    org: 'VX Digital',
    note: l('Grafica per campagne social, gestione dei canali e linee guida visive per i brand.', 'Graphics for social campaigns, channel management and visual guidelines for brands.'),
  },
  {
    years: '2022–2023',
    role: l('Graphic designer', 'Graphic designer'),
    org: '3f&Edin, Arena Flegrea',
    note: l(
      'Materiali per il Noisy Naples Fest su web, social e stampa, a contatto con gli artisti; report e video per la comunicazione del festival.',
      'Material for Noisy Naples Fest across web, social and print, working with the artists; reports and video for the festival’s communication.'
    ),
  },
];

export const EDUCATION: CvItem[] = [
  {
    years: '2026',
    role: l('App designer, PIER Program', 'App designer, PIER Program'),
    org: 'Apple Developer Academy, Università Federico II',
    note: l('Progetto con un cliente internazionale non profit, in team multidisciplinare con Scrum e Jira.', 'A project with an international non-profit client, in a cross-functional team using Scrum and Jira.'),
  },
  {
    years: '2025',
    role: l('Design e sviluppo di app iOS', 'iOS app design and development'),
    org: 'Apple Developer Academy, Università Federico II',
    note: l(
      'Ricerca, flussi e prototipi in Figma, interfacce native secondo le Human Interface Guidelines, sviluppo in SwiftUI e Xcode.',
      'Research, flows and Figma prototypes, native interfaces following the Human Interface Guidelines, development in SwiftUI and Xcode.'
    ),
  },
  {
    years: '2023',
    role: l('Corso in UX/UI design', 'UX/UI design course'),
    org: 'dot Academy',
    note: l('Personas, journey map, user flow, wireframe e prototipi in Figma, valutazione euristica.', 'Personas, journey maps, user flows, wireframes and Figma prototypes, heuristic evaluation.'),
  },
  {
    years: '2022',
    role: l('Corso in web design e UX/UI', 'Web design and UX/UI course'),
    org: 'ILAS, Napoli',
    note: l('Layout responsive, organizzazione dei contenuti, Figma e Adobe Creative Suite.', 'Responsive layouts, content structure, Figma and Adobe Creative Suite.'),
  },
  {
    years: '2017–2021',
    role: l('Laurea triennale in Nuove Tecnologie dell’Arte', 'BA in New Technologies of Art'),
    org: 'Accademia di Belle Arti di Napoli',
    note: l('Comunicazione visiva, media digitali e progetti interattivi in gruppo.', 'Visual communication, digital media and interactive group projects.'),
  },
];

export const SKILLS: { group: L; items: string[] }[] = [
  {
    group: l('Ricerca', 'Research'),
    items: ['User research', 'Field observation', 'Usability testing', 'Heuristic evaluation', 'Personas', 'Customer journey'],
  },
  {
    group: l('Design', 'Design'),
    items: ['User flows', 'Information architecture', 'Wireframing', 'Interactive prototyping', 'High-fidelity UI', 'Design systems', 'Apple HIG', 'Game UX'],
  },
  {
    group: l('Sviluppo', 'Building'),
    items: ['Swift', 'SwiftUI', 'SpriteKit', 'Xcode', 'TestFlight', 'Git / GitHub'],
  },
  {
    group: l('Strumenti', 'Tools'),
    items: ['Figma', 'FigJam', 'Miro', 'Adobe Creative Suite', 'Keynote', 'Jira', 'Notion'],
  },
  {
    group: l('Modo di lavorare', 'Ways of working'),
    items: ['Scrum', 'Sprint planning', 'Co-design with stakeholders', 'Workshop facilitation'],
  },
];
