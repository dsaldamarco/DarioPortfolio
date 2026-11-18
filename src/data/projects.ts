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
  links?: { appStore?: string; support?: string; privacy?: string; github?: string };
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
    id: 'tapp',
    title: 'Tapp',
    year: '2026',
    kind: l('App per iPhone e Mac', 'iPhone and Mac app'),
    summary: l(
      'Trasforma l’iPhone in un trackpad multi-touch e in una tastiera per il Mac, senza fili e senza niente da configurare.',
      'Turns your iPhone into a multi-touch trackpad and keyboard for your Mac, wireless and with nothing to set up.'
    ),
    icon: '/img/tapp/icon.png',
    facts: [
      { label: l('Il mio ruolo', 'My role'), value: l('Design e sviluppo, progetto personale', 'Design and development, personal project') },
      { label: l('Piattaforme', 'Platforms'), value: l('iPhone e Mac', 'iPhone and Mac') },
      { label: l('Strumenti', 'Tools'), value: l('SwiftUI, MultipeerConnectivity', 'SwiftUI, MultipeerConnectivity') },
      { label: l('Stato', 'Status'), value: l('Open source su GitHub', 'Open source on GitHub') },
    ],
    problem: l(
      'Con il Mac collegato alla TV, dal divano o durante una presentazione, tastiera e trackpad restano lontani: per mettere in pausa un video, scorrere una pagina o scrivere una ricerca bisogna alzarsi.',
      'With the Mac hooked up to a TV, from the couch or during a presentation, the keyboard and trackpad are out of reach: to pause a video, scroll a page or type a search you have to get up.'
    ),
    role: [
      l('Ho progettato e sviluppato le due app native in SwiftUI: quella per iPhone e quella per Mac, che vive nella barra dei menu.', 'Designed and built both native SwiftUI apps: the iPhone one and the Mac one, which lives in the menu bar.'),
      l('Ho definito i gesti del trackpad, la barra delle scorciatoie e le due modalità, con un feedback aptico per ogni gesto.', 'Defined the trackpad gestures, the shortcut bar and the two modes, with haptic feedback for every gesture.'),
      l('Ho scritto il protocollo tra i due dispositivi: i movimenti viaggiano veloci, i clic e i tasti arrivano tutti e in ordine.', 'Wrote the protocol between the two devices: movement travels fast, clicks and keys all arrive, in order.'),
    ],
    decisions: [
      {
        title: l('Gli stessi gesti del trackpad del Mac', 'The same gestures as the Mac trackpad'),
        body: l(
          'Un dito muove il puntatore, il tocco con due dita è il clic destro, due dita trascinate scorrono con l’inerzia, tenere premuto e muovere trascina. Non c’è niente da imparare.',
          'One finger moves the pointer, a two-finger tap is a right click, a two-finger drag scrolls with inertia, press and hold then move drags. There is nothing to learn.'
        ),
      },
      {
        title: l('La tastiera dell’iPhone, più i tasti che le mancano', 'The iPhone keyboard, plus the keys it lacks'),
        body: l(
          'Uso la tastiera di sistema, con accenti, emoji e dettatura. Sopra c’è una barra con esc, tab, frecce e ⌘ ⌥ ⌃ ⇧: tocchi il modificatore, poi il tasto, e ⌘ poi c copia.',
          'It uses the system keyboard, with accents, emoji and dictation. Above it, a bar adds esc, tab, arrows and ⌘ ⌥ ⌃ ⇧: tap the modifier, then the key, so ⌘ then c copies.'
        ),
      },
      {
        title: l('Una barra spaziatrice gigante', 'A giant space bar'),
        body: l(
          'La seconda modalità mette una barra spaziatrice enorme accanto al trackpad: per mettere in pausa i video, andare avanti con le slide o giocare senza guardare lo schermo.',
          'The second mode puts a huge space bar next to the trackpad: to pause videos, move through slides or play without looking at the screen.'
        ),
      },
      {
        title: l('Si apre e funziona', 'Open it and it works'),
        body: l(
          'L’iPhone trova il Mac da solo, via Wi-Fi o Bluetooth, e si ricollega da solo se la connessione cade. Lo schermo resta acceso finché l’app è aperta.',
          'The iPhone finds the Mac on its own, over Wi-Fi or Bluetooth, and reconnects by itself if the connection drops. The screen stays on while the app is open.'
        ),
      },
    ],
    outcome: l('Le due app sono open source su GitHub, con licenza MIT.', 'Both apps are open source on GitHub, under the MIT licence.'),
    gallery: [
      phone('/img/tapp/1tapp.webp', l('Modalità tastiera: trackpad, barra delle scorciatoie e tastiera dell’iPhone', 'Keyboard mode: trackpad, shortcut bar and the iPhone keyboard'), 600, 1304),
      phone('/img/tapp/2tapp.webp', l('Modalità barra spaziatrice: una barra gigante sopra il trackpad', 'Spacebar mode: a giant space bar above the trackpad'), 600, 1304),
      phone('/img/tapp/3tapp.webp', l('L’iPhone cerca il Mac per collegarsi', 'The iPhone searching for the Mac to connect'), 600, 1304),
    ],
    links: { github: 'https://github.com/dsaldamarco/Tapp' },
  },
  {
    id: 'betterboxd',
    title: 'Betterboxd',
    year: '2026',
    kind: l('App per la watchlist di Letterboxd', 'Letterboxd watchlist app'),
    summary: l(
      'Un’app per iPhone per la watchlist di Letterboxd: la ordini, crei le tue classifiche, trovi i film in comune con gli amici e lasci al caso la scelta della serata.',
      'An iPhone app for your Letterboxd watchlist: sort it, build your own rankings, find the films you have in common with friends and let chance pick tonight’s movie.'
    ),
    icon: '/img/betterboxd/icon.png',
    facts: [
      { label: l('Il mio ruolo', 'My role'), value: l('Design e sviluppo, progetto personale', 'Design and development, personal project') },
      { label: l('Piattaforma', 'Platform'), value: l('iPhone, iOS 26', 'iPhone, iOS 26') },
      { label: l('Strumenti', 'Tools'), value: l('SwiftUI, API di TMDb', 'SwiftUI, TMDb API') },
      { label: l('Lingue', 'Languages'), value: l('Italiano e inglese', 'Italian and English') },
    ],
    problem: l(
      'La watchlist di Letterboxd cresce e basta: centinaia di film in fila, senza un modo per dare priorità. E quando si sceglie un film in compagnia nessuno sa da dove cominciare, perché ognuno ha la sua lista.',
      'A Letterboxd watchlist only grows: hundreds of films in a row, with no way to set priorities. And when a group picks a film nobody knows where to start, because everyone has their own list.'
    ),
    role: [
      l('Ho progettato e sviluppato l’app in SwiftUI, dall’onboarding a tutte le schermate.', 'Designed and built the app in SwiftUI, from onboarding to every screen.'),
      l('Ho scritto la lettura della watchlist da Letterboxd e i dettagli dei film da TMDb, salvati sul telefono.', 'Wrote the watchlist reading from Letterboxd and the film details from TMDb, cached on the phone.'),
      l('Ho tradotto l’app in italiano e in inglese; segue la lingua del sistema.', 'Localised the app in Italian and English; it follows the system language.'),
    ],
    decisions: [
      {
        title: l('Basta lo username', 'Your username is enough'),
        body: l(
          'Si scrive lo username, @nome o il link del profilo e arriva tutta la watchlist, che si aggiorna da sola quando riapri l’app. L’API di Letterboxd non è pubblica, quindi l’app legge la pagina pubblica della watchlist; in alternativa si importa il file CSV esportato da Letterboxd.',
          'You type your username, @name or profile link and the whole watchlist arrives, refreshing on its own when you reopen the app. Letterboxd’s API is not public, so the app reads the public watchlist page; as an alternative you can import the CSV file exported from Letterboxd.'
        ),
        alternative: l('Chiedere l’accesso all’API di Letterboxd, che viene concesso raramente.', 'Requesting access to Letterboxd’s API, which is rarely granted.'),
      },
      {
        title: l('Classifiche tue, quante ne vuoi', 'Your own rankings, as many as you like'),
        body: l(
          'Liste come “Con gli amici” o “Serata a due”: aggiungi un film con la stella e lo trascini al suo posto.',
          'Lists like “With friends” or “Date night”: star a film to add it and drag it into place.'
        ),
      },
      {
        title: l('Insieme', 'Together'),
        body: l(
          'Aggiungi gli username degli amici e vedi i film che avete tutti in watchlist. Con tre o più persone mostra anche quelli che hanno quasi tutti, e il dado ne sceglie uno.',
          'Add your friends’ usernames and see the films you all have in your watchlists. With three or more people it also shows the ones almost everyone has, and the dice picks one.'
        ),
      },
      {
        title: l('Quando non si decide', 'When nobody can decide'),
        body: l(
          'Casuale fa scorrere i titoli e si ferma su un film, da tutta la watchlist o da una delle tue liste.',
          'Random spins through the titles and stops on a film, from the whole watchlist or one of your lists.'
        ),
      },
      {
        title: l('Nativa iOS 26', 'Native iOS 26'),
        body: l(
          'Liquid Glass su barra delle schede, barre degli strumenti e pulsanti, modalità scura, e una barra delle schede che si riduce mentre scorri.',
          'Liquid Glass on the tab bar, toolbars and buttons, dark mode, and a tab bar that shrinks as you scroll.'
        ),
      },
    ],
    outcome: l('L’app è open source su GitHub, con licenza MIT.', 'The app is open source on GitHub, under the MIT licence.'),
    gallery: [
      phone('/img/betterboxd/2bb.webp', l('La watchlist a griglia, con le locandine', 'The watchlist as a grid of posters'), 588, 1278),
      phone('/img/betterboxd/3bb.webp', l('Una classifica personale da riordinare trascinando', 'A personal ranking to reorder by dragging'), 588, 1278),
      phone('/img/betterboxd/4bb.webp', l('Serata film: chi guarda e i film in comune', 'Movie night: who’s watching and the films in common'), 588, 1278),
      phone('/img/betterboxd/1bb.webp', l('La schermata di benvenuto: username di Letterboxd o file CSV', 'The welcome screen: Letterboxd username or CSV file'), 588, 1278),
      phone('/img/betterboxd/5bb.webp', l('Casuale: il film scelto dalla watchlist', 'Random: the film picked from the watchlist'), 588, 1278),
      phone('/img/betterboxd/6bb.webp', l('Scheda del film in modalità scura', 'Film details in dark mode'), 588, 1278),
      phone('/img/betterboxd/7bb.webp', l('Scheda del film in modalità chiara', 'Film details in light mode'), 588, 1278),
    ],
    links: { github: 'https://github.com/dsaldamarco/Smarterboxd' },
  },
  {
    id: 'melting-pot',
    title: 'Melting Pot',
    year: '2025',
    kind: l('Party game cooperativo per iPhone', 'Co-op party game for iPhone'),
    summary: l(
      'Un party game cooperativo da 2 a 6 giocatori, ognuno con il suo iPhone: si urla, si passano ingredienti assurdi attraverso i portali e si preparano pozioni in una cucina magica, prima che scada il tempo.',
      'A co-op party game for 2 to 6 players, each on their own iPhone: you shout, pass absurd ingredients through portals and brew potions in a magical kitchen before time runs out.'
    ),
    icon: '/img/melting-pot/icon.png',
    facts: [
      { label: l('Il mio ruolo', 'My role'), value: l('Game designer e UX/UI designer', 'Game designer and UX/UI designer') },
      { label: l('Team', 'Team'), value: l('5 persone', '5 people') },
      { label: l('Giocatori', 'Players'), value: l('Da 2 a 6, in locale, un iPhone a testa', '2 to 6, local, one iPhone each') },
      { label: l('Lingue', 'Languages'), value: l('Inglese, italiano e spagnolo', 'English, Italian and Spanish') },
      { label: l('Stato', 'Status'), value: l('Prototipo funzionante', 'Working prototype') },
    ],
    context: l(
      'Siamo partiti da un tema, non da un gioco: le decisioni. Secondo una ricerca del 2024 prendiamo in media 35.000 decisioni al giorno, e la fatica di decidere peggiora il giudizio e aumenta lo stress. Secondo Daniel Kahneman (“Pensieri lenti e veloci”) il cervello usa due sistemi: uno veloce e intuitivo, uno lento e analitico. Le attività che chiedono decisioni rapide, come i giochi, allenano il primo.',
      'We started from a theme, not a game: decisions. According to a 2024 study we make about 35,000 decisions a day, and decision fatigue worsens judgment and increases stress. According to Daniel Kahneman (“Thinking, Fast and Slow”) the brain runs two systems: one fast and intuitive, one slow and analytical. Activities that demand quick decisions, like games, train the first.'
    ),
    problem: l(
      'Complessità, paura delle conseguenze, incertezza, fatica ed emozioni rendono le decisioni difficili, e fanno pensare troppo. La domanda che ci siamo fatti: come possiamo aiutare le persone a decidere più in fretta, e con più fiducia?',
      'Complexity, fear of consequences, uncertainty, fatigue and emotions make decisions hard, and make people overthink. The question we asked ourselves: how can we help people decide faster, and with more confidence?'
    ),
    evidence: [
      { figure: '35.000', label: l('decisioni prese in media ogni giorno (ricerca del 2024)', 'decisions made on average every day (2024 study)') },
      { figure: '31,8%', label: l('del nostro sondaggio gioca a Uno con amici e famiglia', 'of our survey play Uno with friends and family') },
      { figure: '3–5', label: l('persone per ogni sessione di playtest', 'people in each playtest session') },
    ],
    goal: l(
      'Un gioco veloce in cui si decide in gruppo e sotto pressione: chi gioca smette di ragionare troppo e si fida della squadra.',
      'A fast game where you decide as a group and under pressure: players stop overthinking and trust their team.'
    ),
    role: [
      l('Ho progettato le meccaniche cooperative: ricette, portali tra i telefoni, timer e personaggi.', 'Designed the co-op mechanics: recipes, portals between phones, timer and characters.'),
      l('Ho disegnato l’interfaccia di gioco e il sistema visivo in pixel art.', 'Designed the game interface and the pixel-art visual system.'),
      l('Ho trasformato quello che abbiamo visto nei playtest in modifiche a regole, ritmo e interfaccia.', 'Turned what we saw in playtests into changes to rules, pacing and interface.'),
    ],
    teamRole: [
      l('Analisi di giochi basati sulle decisioni, digitali e da tavolo: Papers, Please, Reigns, Overcooked, Codenames e altri.', 'Analysis of decision-based games, digital and tabletop: Papers, Please, Reigns, Overcooked, Codenames and others.'),
      l('Sondaggio sui giochi preferiti con amici e famiglia, test interni e playtest con piccoli gruppi.', 'A survey on favourite games with friends and family, internal tests and playtests with small groups.'),
      l('Sviluppo dell’app per iPhone e del multigiocatore in locale.', 'Development of the iPhone app and local multiplayer.'),
      l('Localizzazione in inglese, italiano e spagnolo, e un modello di business con acquisti in app.', 'Localisation into English, Italian and Spanish, and a business model with in-app purchases.'),
    ],
    research: {
      intro: l(
        'Abbiamo chiesto alle persone: “Qual è il tuo gioco preferito con amici o famiglia, e perché?”. Uno, Exploding Kittens e Cards Against Humanity in testa. Piacciono perché sono intuitivi, dinamici, facili da spiegare e fanno decidere in fretta; non piacciono troppe regole, confusione, partite lunghe e troppa fortuna. Poi abbiamo fatto test interni e playtest con gruppi di 3–5 persone, osservando dove si confondevano.',
        'We asked people: “What’s your go-to game with friends or family, and why do you like it?”. Uno, Exploding Kittens and Cards Against Humanity came out on top. People like them because they are intuitive, dynamic, easy to explain and make you decide fast; they dislike too many rules, confusion, long sessions and too much luck. Then we ran internal tests and playtests with groups of 3–5 people, watching where they got confused.'
      ),
      findings: [
        l('Un ritmo veloce aumenta il coinvolgimento.', 'A fast pace increases engagement.'),
        l('Scelte più semplici riducono il carico cognitivo.', 'Simpler choices reduce cognitive load.'),
        l('Le dinamiche di gruppo cambiano la velocità con cui si decide.', 'Group dynamics change how fast people decide.'),
        l('Un feedback chiaro fa sentire sicuri delle proprie scelte.', 'Clear feedback makes players feel confident in their choices.'),
        l('“Collaborare con la squadra mi ha tolto la paura delle conseguenze” (Gina, 26). “Ho smesso di pensarci troppo e ho seguito l’istinto” (Luca, 29).', '“Collaborating with my team made me not have fear about my consequences” (Gina, 26). “I stopped overthinking and just went with it” (Luca, 29).'),
      ],
      photos: [
        { src: '/img/melting-pot/playtest1.jpg', kind: 'photo', w: 669, h: 396, alt: l('Un gruppo gioca a un prototipo di carta di Melting Pot intorno a un tavolo, con i volti sfocati', 'A group plays a paper prototype of Melting Pot around a table, faces blurred'), caption: l('Playtest con piccoli gruppi', 'Playtests with small groups') },
        { src: '/img/melting-pot/playtest2.jpg', kind: 'photo', w: 580, h: 486, alt: l('Membri del team provano le meccaniche con carte e oggetti su un tavolo', 'Team members try out the mechanics with cards and objects on a table'), caption: l('Test interni sulle meccaniche', 'Internal tests of the mechanics') },
      ],
    },
    decisions: [
      {
        title: l('Ognuno ha la ricetta, gli altri hanno gli ingredienti', 'Everyone has a recipe, the others have the ingredients'),
        body: l(
          'Ogni mago vede sul suo telefono la ricetta da completare entro il tempo limite, ma gli ingredienti compaiono sui telefoni degli altri. Per vincere bisogna parlarsi, anzi urlare.',
          'Each mage sees on their phone the recipe to complete within the time limit, but the ingredients appear on the others’ phones. To win you have to talk, or rather shout.'
        ),
      },
      {
        title: l('I telefoni diventano un tavolo', 'The phones become one table'),
        body: l(
          'Gli iPhone si mettono in cerchio e gli ingredienti passano da uno all’altro attraverso i portali ai lati dello schermo: lo spazio fisico fa parte del gioco.',
          'The iPhones sit in a circle and ingredients move from one to the next through portals at the sides of the screen: the physical space is part of the game.'
        ),
      },
      {
        title: l('Regole che si spiegano in un minuto', 'Rules you can explain in a minute'),
        body: l(
          'Il sondaggio diceva che troppe regole e partite lunghe rovinano la serata. Un obiettivo solo, la pozione, e round brevi con il timer sempre visibile.',
          'The survey said too many rules and long sessions ruin the night. One goal, the potion, and short rounds with the timer always on screen.'
        ),
        alternative: l('Un gioco di strategia a turni, con più regole e partite lunghe.', 'A turn-based strategy game, with more rules and long sessions.'),
      },
      {
        title: l('Leggibile da tutti', 'Readable by everyone'),
        body: l(
          'Pixel art ad alto contrasto, sei maghi riconoscibili da colore e forma (Pyrocaster, Frostmancer, Mossbinder, Stonemaker, Stormcaller, Nightbringer) e animazioni vivaci, pensate per giocare in fretta e da più persone insieme.',
          'High-contrast pixel art, six mages you recognise by colour and shape (Pyrocaster, Frostmancer, Mossbinder, Stonemaker, Stormcaller, Nightbringer) and lively animation, made for quick play by several people at once.'
        ),
      },
      {
        title: l('Diventa sempre più difficile', 'It only gets harder'),
        body: l(
          'Gli aggiornamenti previsti aggiungono più ingredienti per ricetta, etichette enigmatiche al posto dei nomi e ingredienti intrappolati negli incantesimi.',
          'Planned updates add more ingredients per recipe, riddle labels instead of names and ingredients trapped in spells.'
        ),
      },
    ],
    outcome: l(
      'Il prototipo funziona su iPhone da 2 a 6 giocatori ed è tradotto in tre lingue. Nei playtest le persone dicevano di essersi divertite, di voler rigiocare e di aver smesso di pensarci troppo.',
      'The prototype runs on iPhone for 2 to 6 players and is translated into three languages. In playtests people said they had fun, wanted to play again and had stopped overthinking.'
    ),
    learnings: [
      {
        title: l('Partire dal comportamento, non dal genere', 'Start from behaviour, not from a genre'),
        body: l('Il tema delle decisioni ci ha dato un criterio per ogni scelta di gioco: aiuta a decidere più in fretta, o no?', 'The theme of decisions gave us a test for every game choice: does it help people decide faster, or not?'),
      },
      {
        title: l('Il gruppo toglie la paura di sbagliare', 'The group removes the fear of mistakes'),
        body: l('Decidere insieme rende l’errore leggero: è la cosa che i giocatori hanno notato di più.', 'Deciding together makes mistakes feel light: it is what players noticed most.'),
      },
    ],
    gallery: [1, 2, 3].map((n) => phone(`/img/melting-pot/${n}mp.png`, l(`Melting Pot, schermata ${n} di 3`, `Melting Pot, screen ${n} of 3`), 597, 1200)),
  },
  {
    id: 'sortie',
    title: 'Sortie',
    year: '2025',
    kind: l('App di sleep coaching per iPhone', 'Sleep coaching app for iPhone'),
    summary: l(
      'Un coach del sonno per iPhone e Apple Watch basato sulla terapia di restrizione del sonno: ti dà una finestra di ore a letto, misura quanto bene dormi e la allarga settimana dopo settimana.',
      'A sleep coach for iPhone and Apple Watch built on sleep restriction therapy: it gives you a window of hours in bed, measures how well you sleep and widens it week by week.'
    ),
    icon: '/img/sortie/icon.png',
    iconInset: true,
    facts: [
      { label: l('Il mio ruolo', 'My role'), value: l('Product designer', 'Product designer') },
      { label: l('Piattaforma', 'Platform'), value: l('iPhone e Apple Watch', 'iPhone and Apple Watch') },
      { label: l('Metodo', 'Method'), value: l('Terapia di restrizione del sonno', 'Sleep restriction therapy') },
    ],
    context: l(
      'La restrizione del sonno è una tecnica usata nella terapia cognitivo-comportamentale per l’insonnia: si riduce il tempo passato a letto a quello in cui si dorme davvero, così il sonno diventa più compatto, poi lo si allunga man mano che l’efficienza del sonno migliora. Lo slogan dell’app lo riassume: dormire di più dormendo meno.',
      'Sleep restriction is a technique used in cognitive behavioural therapy for insomnia: you cut the time spent in bed down to the time you actually sleep, so sleep becomes more consolidated, then extend it as sleep efficiency improves. The app’s tagline sums it up: sleep more by sleeping less.'
    ),
    problem: l(
      'Molte app per il sonno riempiono di grafici e notifiche luminose proprio prima di dormire, e misurano senza dire cosa fare. Seguire una terapia che chiede di andare a letto più tardi, invece, richiede regole chiare e qualcuno che incoraggi.',
      'Many sleep apps fill the screen with charts and bright notifications right before bed, and measure without telling you what to do. Following a therapy that asks you to go to bed later, instead, needs clear rules and someone to encourage you.'
    ),
    goal: l(
      'Rendere la terapia facile da seguire ogni notte: un orario chiaro, un numero solo da guardare al risveglio e un coach che accompagna.',
      'Make the therapy easy to follow every night: a clear schedule, a single number to check when you wake up and a coach to keep you going.'
    ),
    role: [
      l('Ho progettato l’esperienza su iPhone e Apple Watch: programma settimanale, schermata del risveglio, statistiche e app per il polso.', 'Designed the experience across iPhone and Apple Watch: weekly programme, wake-up screen, statistics and the wrist app.'),
    ],
    decisions: [
      {
        title: l('Un orario, non un grafico', 'A schedule, not a chart'),
        body: l(
          'La schermata principale mostra la settimana del programma e la finestra di sonno: a che ora andare a letto e a che ora alzarsi.',
          'The main screen shows the week of the programme and the sleep window: when to go to bed and when to get up.'
        ),
      },
      {
        title: l('Un numero solo al risveglio', 'One number when you wake up'),
        body: l(
          'Quanto hai dormito e l’efficienza del sonno in grande, con un incoraggiamento (“You got this!”). Le statistiche giorno per giorno sono un tocco più in là, con i colori per capire subito le notti andate male.',
          'How long you slept and your sleep efficiency, big, with a word of encouragement (“You got this!”). Day-by-day statistics are one tap away, with colours that show the bad nights at a glance.'
        ),
      },
      {
        title: l('Un coach con una faccia', 'A coach with a face'),
        body: l(
          'Il coach è un piccolo personaggio a forma di sveglia: rende la terapia meno clinica e dà una voce ai consigli.',
          'The coach is a small alarm-clock character: it makes the therapy feel less clinical and gives the advice a voice.'
        ),
      },
      {
        title: l('Due modi di registrare il sonno', 'Two ways to log sleep'),
        body: l(
          'Il sonno si registra da solo con l’Apple Watch, oppure lo si inserisce a mano in qualsiasi momento. Sul polso si vedono la percentuale e le ore della notte.',
          'Sleep is tracked automatically with Apple Watch, or you can log it by hand at any time. On the wrist you see the percentage and the hours of the night.'
        ),
      },
      {
        title: l('Un’interfaccia per la notte', 'An interface for the night'),
        body: l(
          'Fondo nero, un solo colore acceso e caratteri da display digitale, per non accendere lo schermo in faccia prima di dormire.',
          'A black ground, one bright accent and digital-display type, so the screen does not glare at you before sleep.'
        ),
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
      'Un’app per iPhone per chi legge, ispirata a Letterboxd: tieni traccia dei libri letti, li valuti, scrivi recensioni, crei liste e scopri cosa leggono gli altri.',
      'An iPhone app for readers, inspired by Letterboxd: track the books you read, rate them, write reviews, build lists and see what others are reading.'
    ),
    icon: '/img/bookmarked/icon.png',
    iconInset: true,
    facts: [
      { label: l('Il mio ruolo', 'My role'), value: l('Product designer e sviluppatore iOS', 'Product designer and iOS developer') },
      { label: l('Piattaforma', 'Platform'), value: l('iPhone', 'iPhone') },
      { label: l('Strumenti', 'Tools'), value: l('SwiftUI, Core Data', 'SwiftUI, Core Data') },
      { label: l('Stato', 'Status'), value: l('Open source su GitHub', 'Open source on GitHub') },
    ],
    problem: l(
      'Per i film c’è Letterboxd, un posto curato dove segnare, votare e consigliare. Per i libri le app che tengono traccia delle letture sono spesso datate, lente e poco curate nella tipografia, e scrivere una recensione o fare una lista richiede troppi passaggi.',
      'Films have Letterboxd, a polished place to log, rate and recommend. For books, reading-tracker apps are often dated, slow and careless with typography, and writing a review or making a list takes too many steps.'
    ),
    role: [
      l('Ho progettato il prodotto: struttura, flussi e interfaccia.', 'Designed the product: structure, flows and interface.'),
      l('Ho sviluppato l’app in SwiftUI, con Core Data per salvare tutto sul telefono.', 'Built the app in SwiftUI, with Core Data to keep everything on the phone.'),
    ],
    decisions: [
      {
        title: l('Il libro al centro', 'The book at the centre'),
        body: l(
          'La scheda del libro è editoriale: copertina, titolo, autore, anno e voto medio in primo piano, poi la descrizione.',
          'The book page is editorial: cover, title, author, year and average rating up front, then the description.'
        ),
      },
      {
        title: l('Tre gesti a portata di pollice', 'Three actions within thumb reach'),
        body: l(
          'Letto, Consiglia e Segnalibro sono i primi pulsanti della scheda, con le stelline per votare subito sotto. Recensione, aggiunta alle liste e condivisione vengono dopo.',
          'Read, Recommend and Bookmark are the first buttons on the page, with the stars to rate right below. Review, add to lists and share come after.'
        ),
      },
      {
        title: l('Libri, recensioni e liste', 'Books, reviews and lists'),
        body: l(
          'La home separa le tre cose che si fanno su un social di lettura: scoprire libri, leggere le recensioni degli altri e sfogliare le liste.',
          'The home splits the three things you do on a reading social: discover books, read other people’s reviews and browse lists.'
        ),
      },
      {
        title: l('Un profilo che racconta chi legge', 'A profile that tells who you are as a reader'),
        body: l(
          'Libri letti e da leggere, i preferiti in copertina, l’attività recente con i voti e l’obiettivo di lettura dell’anno.',
          'Books read and to read, favourites shown as covers, recent activity with ratings and the reading goal for the year.'
        ),
      },
      {
        title: l('Offline prima di tutto', 'Offline first'),
        body: l('Tutto è salvato sul telefono, perché si legge anche dove non c’è rete.', 'Everything is saved on the phone, because people read where there is no signal.'),
      },
    ],
    outcome: l('L’app è open source su GitHub, con licenza MIT.', 'The app is open source on GitHub, under the MIT licence.'),
    gallery: [1, 2, 3].map((n) => phone(`/img/bookmarked/${n}book.png`, l(`Bookmarked, schermata ${n} di 3`, `Bookmarked, screen ${n} of 3`), 594, 1200)),
    links: { github: 'https://github.com/dsaldamarco/Bookmarked' },
  },
];

export const getProject = (id: string) => PROJECTS.find((p) => p.id === id);

/**
 * Interactive web experiment, listed with the other projects but without a case
 * study: it opens the tool itself (a separate app in tools/holo-card).
 */
export const HOLO_STUDIO = {
  id: 'holo-studio',
  title: 'Holo Studio',
  year: '2026',
  href: '/tools/holo-card/',
  kind: l('Esperimento web interattivo', 'Interactive web experiment'),
  summary: l(
    'Una carta collezionabile olografica: carichi un’immagine, la inclini con il cursore e la giri. Riflessi e fisica in React e CSS.',
    'A holographic trading card: upload an image, tilt it with your cursor and flip it. Reflections and physics in React and CSS.',
  ),
  icon: '/img/holo-studio/icon.png',
  preview: { src: '/img/holo-studio/preview.webp', w: 1024, h: 1376 },
};

const wide = (src: string, alt: L): Shot => ({ src, alt, kind: 'photo', w: 1600, h: 900 });

/**
 * Free, unofficial fan game with its own site: featured on the home after Orby
 * and listed in More projects, both linking out to nosurvivors.online.
 */
export const NOSURVIVORS = {
  id: 'nosurvivors',
  title: 'NoSurvivors',
  year: '2026',
  href: 'https://nosurvivors.online',
  site: 'nosurvivors.online',
  kind: l('Roguelike per PC e browser', 'Roguelike for PC and browser'),
  badge: l('Fan game gratuito', 'Free fan game'),
  summary: l(
    'Un roguelike di sopravvivenza ambientato nel mondo di NosTale: ondate infinite di mostri, da soli o in cooperativa online fino a 4 giocatori. Gratuito per Windows, macOS e nel browser.',
    'A survival roguelike set in the world of NosTale: endless waves of monsters, alone or in online co-op with up to 4 players. Free on Windows, macOS and in the browser.',
  ),
  more: l(
    'Roguelike di sopravvivenza nel mondo di NosTale, con cooperativa online fino a 4 giocatori e sei modalità extra, dai kart al tower defense.',
    'A survival roguelike in the world of NosTale, with online co-op for up to 4 players and six extra modes, from karts to tower defense.',
  ),
  icon: '/img/nosurvivors/icon.png',
  facts: [
    { label: l('Il mio ruolo', 'My role'), value: l('Game design, UX/UI e sviluppo', 'Game design, UX/UI and development') },
    { label: l('Piattaforme', 'Platforms'), value: l('Windows, macOS e browser, anche da telefono', 'Windows, macOS and browser, phone included') },
    { label: l('Multigiocatore', 'Multiplayer'), value: l('Cooperativa online fino a 4 giocatori', 'Online co-op for up to 4 players') },
    { label: l('Strumenti', 'Tools'), value: l('Godot 4, GDScript', 'Godot 4, GDScript') },
  ],
  decisions: [
    {
      title: l('Un mondo che conosci', 'A world you already know'),
      body: l(
        'Interfaccia, finestre, puntatori e numeri dei danni vengono dal client originale: chi ha giocato a NosTale si orienta senza spiegazioni.',
        'Interface, windows, pointers and damage numbers come from the original client: anyone who played NosTale finds their way without explanations.',
      ),
    },
    {
      title: l('Scegliere senza fermarsi', 'Choosing without stopping'),
      body: l(
        'A ogni livello tre carte affiancate e una scelta sola. Chi vuole solo giocare attiva la scelta automatica di skill e oggetti, e la partita non si ferma.',
        'Each level-up shows three cards side by side and one choice. Players who just want to play can turn on automatic skill and item picks, so the run never stops.',
      ),
    },
    {
      title: l('Si gioca ovunque', 'Play it anywhere'),
      body: l(
        'Un solo progetto per PC e browser: tastiera, controller Xbox o PlayStation riconosciuto da solo, e sul telefono si cammina tenendo il dito sullo schermo.',
        'One project for PC and browser: keyboard, an Xbox or PlayStation controller detected on its own, and on a phone you walk by holding a finger on the screen.',
      ),
    },
  ] as Note[],
  gallery: [
    wide('/img/nosurvivors/horde.webp', l('Uno spadaccino circondato da un’orda di mostri nell’Avamposto Fernon, con minimappa e danni per skill', 'A swordsman surrounded by a horde of monsters in Fernon Outpost, with minimap and damage per skill')),
    wide('/img/nosurvivors/levelup.webp', l('La schermata di level-up: il personaggio al centro e tre potenziamenti tra cui scegliere', 'The level-up screen: the character in the centre and three upgrades to choose from')),
    wide('/img/nosurvivors/raid.webp', l('Il raid di Lord Draco: il boss in volo e le meteore da schivare', 'The Lord Draco raid: the boss in flight and meteors to dodge')),
    wide('/img/nosurvivors/nosville.webp', l('NosVille, il menu principale da girare a piedi tra gli NPC', 'NosVille, the main menu you walk around among the NPCs')),
  ],
};

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
