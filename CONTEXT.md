# Redesign del portfolio: contesto di lavoro

Ultimo aggiornamento: 28 ottobre 2026, sera (seconda sessione). Committato su `main`.

## Obiettivo

Ridisegnare il portfolio di Dario Saldamarco perché convinca recruiter e hiring manager in pochi secondi che è un UX/UI designer credibile, senza nessuna sensazione di "AI slop". Vincoli: tenere identità e contenuti reali, non inventare risultati, metriche o esperienze; segnalare cosa manca.

Skill usate: **impeccable** (`.claude/skills/impeccable`), **taste-skill** (`.claude/skills/design-taste-frontend`), **Emil Kowalski** (`.claude/skills/emil-design-eng` e le altre del pacchetto).

## Decisioni prese con Dario

| Domanda | Scelta |
| --- | --- |
| Posizionamento | UX/UI designer che segue **prodotti digitali** dalla ricerca al prodotto finito (aggiornato nella seconda sessione: non solo iPhone/iPad); saper sviluppare in Swift come punto di forza |
| Minigioco ritmico | Prima tenuto in fondo, poi **rimosso** nella seconda sessione |
| Lingua iniziale | **Lingua del browser** (italiano se il browser è in italiano, altrimenti inglese), con selettore IT/EN |
| Direzione visiva | **"La tua home screen"**: le icone vere delle 6 app sono la prima schermata, ognuna apre il suo case study come un'app che si avvia. Fondo chiaro. |

Le altre direzioni proposte e scartate: "Palco del keynote" (assegnata dal sistema di impeccable, scura, rischio omaggio ad Apple) e "Portfolio classico, fatto bene".

## Seconda sessione (28 ottobre, sera): modifiche chieste da Dario

- **Titolo**: "Progetto app che so anche costruire" era troppo "cringe". Ora: **"Dalla ricerca al prodotto finito." / "From research to finished product."** (alternative possibili se non convince: "Progetto prodotti digitali." / "Design di prodotto, dall'idea al rilascio.").
- **Testo sotto il titolo**: tolta Napoli, resta solo "UX/UI designer"; il testo parla di prodotti digitali seguiti dall'inizio alla fine, non solo di iPhone e iPad. Si deve capire che fa product design: la riga di stato e i contatti dicono "Cerco un ruolo da UX/UI o product designer".
- **Colori**: lo sfondo ardesia non piaceva. Nuova palette (estratta con taste-skill): fondo grigio rosato `#ebe5e3`, inchiostro bruno-nero `#2b2622`, campi a tono leggermente più scuro, chiusura scura `#26211e`, verde `#0f7d45` solo su passaggio del mouse, anello di focus e il pulsante del footer.
- **Più "premium"**: titoli in peso 400, solo il nome sotto le icone (come su iOS), prima schermata compatta senza vuoti, pulsanti scuri.
- **Tolto l'orario "a Napoli"** dalla barra in alto.
- **Tolto il minigioco** (file eliminati; resta nella cronologia git).
- Tolta dalla lettera la frase sul mentoring all'hackathon (resta nell'esperienza) e tolto il nome gigante dal footer.

## Terza sessione (29 ottobre): credibilità per i recruiter

- **CV scaricabili**: `public/cv/Dario-Saldamarco-CV-IT.pdf` e `-EN.pdf` (copiati da `~/Desktop/CV-DarioSaldamarco-ITA.pdf` e `CV-Dario-Saldamarco-EN.pdf`). Il link segue la lingua della pagina: nella barra ("CV"), sotto il titolo in home, nella sezione Esperienza e nei contatti.
- **Disponibilità**: Dario non la vuole sul sito (se ne parla al colloquio).
- **Case study di Orby riscritto dalla documentazione** (`public/projects/orby/AKANKSHA PROJECT DOCUMENTATION.pdf`): team reale (Team WonderRaga: Dario e Alessia Frezzetti designer, Irem Nur Arslaner project manager, 4 sviluppatori), durata ottobre 2025 – giugno 2026, richiesta iniziale (geometria), obiettivo, "cosa fa / cosa non fa", contributo diviso in "Io" e "Con il team", tappe mese per mese, scoperte di Pune, decisioni con l'alternativa scartata.
- **Nuova sezione "Come lavoro"** in home (e voce "Metodo" nel menu): 4 abitudini, ognuna con la prova presa da un progetto. La lettera ora si chiama "Chi sono".
- **Classi scolastiche**: in italiano si usano gli equivalenti italiani, non la traduzione letterale (Grade 6 = prima media, Grades 3–8 = dalla terza elementare alla terza media, Grades 6–8 = le medie).
- **Meno gergo tecnico**: il risultato di Orby (in home e nel case study) non cita più MVP 2.0 né le build TestFlight 1.1–1.2; le tappe ne parlano in modo generale.
- **Da verificare con Dario**: la divisione del lavoro con Alessia Frezzetti (la colonna "Io" usa le voci del suo CV); nel CV inglese la descrizione del PIER Program e "2023 - in corso" sono rimasti in italiano.
- **In attesa**: i materiali di processo (wireframe, user flow, iterazioni) che Dario manderà.

## Cosa c'era prima e perché non funzionava

Sito React + Vite, tema scuro, sfondo 3D (three.js), cursore personalizzato, bagliori viola, 3 caratteri (Inter, Fraunces, Space Mono), etichette maiuscole in monospace, griglie di schede uguali, case study in una finestra modale (solo Orby aveva una pagina vera). Il controllo di taste-skill dava 13 errori. Bug di accessibilità: il minigioco catturava la tastiera su tutta la pagina (ogni tasto faceva partire il gioco, la barra spaziatrice non scorreva più).

## Cosa è stato fatto

**Struttura della home** (`src/components/home/Home.tsx`, `home.css`):
1. Home screen: titolo "Dalla ricerca al prodotto finito.", frase di presentazione, pulsante "Guarda i progetti", griglia 3×2 delle icone (6 app, solo il nome).
2. Orby's Adventure in evidenza: schermate in dissolvenza, fatti, colonne Problema (32,3%) / Cosa ho deciso (foto del test a Pune) / Risultato.
3. You Can Only: testo + 3 schermate su pannello scuro, badge App Store.
4. Altri progetti: indice di Melting Pot, Synk, Sortie, Bookmarked con anteprima che cambia al passaggio del mouse.
5. "Come lavoro": lettera in prima persona + foto dal campo a Pune.
6. Esperienza e formazione (ordinate per data) + competenze raggruppate.
7. Contatti: campo scuro, email grande, copia indirizzo, LinkedIn / Dribbble / GitHub.

**Case study** (`src/pages/CaseStudyPage.tsx`): una pagina per progetto su `/projects/<id>`, stessa struttura per tutti (contesto, problema, cosa ho fatto, processo, decisioni, prima/dopo, ricerca, risultato, cosa ho imparato, schermate, progetto successivo). Le sezioni senza contenuto reale non compaiono. `/case-study/orbys-adventure` continua a funzionare. Transizione "apertura app" dall'icona all'intestazione (View Transitions API, disattivata con riduzione del movimento).

**Contenuti** (`src/data/projects.ts`, `src/i18n/translations.ts`): tutti bilingue, riscritti dai testi già presenti nel sito, senza aggiungere fatti nuovi. Novità reale trovata nel materiale: il prima/dopo di Orby (foto del test con istruzioni scritte in inglese → versione illustrata quasi senza testo).

**Sistema visivo** (dettagli in `DESIGN.md`): fondo grigio rosato `#ebe5e3`, inchiostro `#2b2622`, verde `#0f7d45` usato con parsimonia, un solo carattere (Hanken Grotesk), angoli 24px, pulsanti a pillola, nessuna linea, ombra o sfumatura.

**Tecnica**:
- Router minimo in `src/lib/router.ts`, entrate in scena in `src/lib/useReveal.ts`.
- `?lang=it` / `?lang=en` nell'indirizzo forza la lingua (utile per mandare link ai recruiter); la scelta manuale viene ricordata.
- Immagini ottimizzate in `public/img/<progetto>/` (da circa 40 MB a 10 MB, caricamento solo quando servono); originali intatti in `public/projects/`.
- Rimossi: componenti vecchi (modale, sfondo 3D, griglie, timeline, OrbyCaseStudy.tsx…) e librerie three, lenis, gsap, framer-motion.
- Pagine legali di You Can Only (`/you-can-only/support`, `/privacy`) invariate nei contenuti, con i nuovi colori.
- `scripts/postbuild.js` aggiornato con i nuovi indirizzi dei case study.

**Verifiche fatte**: build di produzione senza errori; controllo taste-skill 0 errori (era 13) a 1440, 768 e 390 px, in italiano e in inglese; controllo impeccable senza problemi; interazioni provate in Chrome (lingua, apertura case study, ritorno, tastiera, gioco, pagina inesistente, ordine del Tab).

Avvisi rimasti, giustificati: nessun video (non esistono filmati dei progetti); margini laterali "diversi" secondo una stima statistica sul testo allineato a sinistra (pannelli e immagini toccano entrambi i margini allo stesso modo).

## Cosa manca (da chiedere o da fornire)

- **Risultati misurati**: dati dai test di Orby, download o valutazioni di You Can Only.
- **Dettagli dei 4 progetti minori**: team, ruolo preciso, ricerca, processo, stato (App Store o prototipo), se Synk ha vinto lo Swift Student Challenge.
- **Una foto vera** di Dario (oggi c'è solo l'avatar illustrato).
- **Lingue parlate** e livello.

## Da verificare con Dario

- Che la schermata illustrata di Orby (`5orby.png`) sia davvero successiva al prototipo della foto `testing1.jpg`; se no, cambiare la didascalia del prima/dopo.
- Il tono della lettera "Come lavoro": usa solo fatti presenti nel sito, ma deve suonare come lui.

## Possibili prossimi passi

- Inserire i contenuti mancanti appena arrivano (i case study minori si arricchiscono da soli: basta aggiungere i campi in `projects.ts`).
- Decidere se committare le cartelle delle skill (`.claude/`, `.agents/`, `.codex/`, `skills-lock.json`); `.taste-skill/` e `.impeccable/review/` sono già in `.gitignore`.
- Commit e deploy su Vercel.

## File di riferimento

- `PRODUCT.md`: fatti del progetto (pubblico, posizionamento, prove disponibili, cosa non inventare).
- `DESIGN.md` e `.impeccable/design.json`: sistema visivo.
- `.impeccable/surfaces/src-app-tsx.md`: contratto della direzione visiva usato da impeccable.
- `.taste-skill/direction.json`: scheda della direzione di taste-skill.

Per avviare: `npm run dev`, poi http://localhost:5173/
