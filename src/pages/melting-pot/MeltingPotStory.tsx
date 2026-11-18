import React from 'react';
import { getProject, type L } from '../../data/projects';
import { useLanguage } from '../../i18n/LanguageContext';
import { Row, reveal } from '../cs-parts';
import './melting-pot.css';

const l = (it: string, en: string): L => ({ it, en });
const IMG = '/img/melting-pot';

/* ── Research and testing ─────────────────────────────────── */

const LIKES = [
  l('Intuitivi', 'Intuitive'),
  l('Dinamici', 'Dynamic'),
  l('Adrenalina', 'Adrenaline'),
  l('Cooperativi', 'Cooperative'),
  l('Facili da spiegare', 'Easy to explain'),
  l('Si sta insieme', 'Social'),
  l('Si decide in fretta', 'Fast decisions'),
];
const DISLIKES = [l('Troppe regole', 'Too many rules'), l('Confusi', 'Confusing'), l('Partite lunghe', 'Long sessions'), l('Troppa fortuna', 'Luck-based')];

const QUOTES = [
  { text: l('Collaborare con la squadra mi ha tolto la paura delle conseguenze.', 'Collaborating with my team made me not have fear about my consequences.'), who: 'Gina, 26' },
  { text: l('Ho smesso di pensarci troppo e ho seguito l’istinto.', 'I stopped overthinking and just went with it.'), who: 'Luca, 29' },
  { text: l('Il timer ha aggiunto emozione.', 'The timer added excitement.'), who: 'Serena, 26' },
];

export const MPResearch: React.FC = () => {
  const { t, language } = useLanguage();
  const research = getProject('melting-pot')!.research!;
  return (
    <Row title={l('Ricerca e test', 'Research and testing')[language]} id="cs-research" wide>
      <p className="lead cs-note">{research.intro[language]}</p>

      <div className="mp-panel mp-survey">
        <figure className="mp-survey-chart">
          <img
            src={`${IMG}/survey.png`}
            alt={l(
              'Grafico a torta del sondaggio: Uno 31,8%, Exploding Kittens 22,7%, Cards Against Humanity 18,2%, Wolf 13,6%, poi Bad Choices, Trivial Pursuit e Scala 40 al 4,5% ciascuno',
              'Survey pie chart: Uno 31.8%, Exploding Kittens 22.7%, Cards Against Humanity 18.2%, Wolf 13.6%, then Bad Choices, Trivial Pursuit and Scala 40 at 4.5% each'
            )[language]}
            width="1238"
            height="526"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="mp-survey-text">
          <p className="mp-kicker">{l('Il sondaggio', 'The survey')[language]}</p>
          <p className="mp-question">
            {l('“Qual è il tuo gioco preferito con amici o famiglia, e perché ti piace?”', '“What’s your go-to game with friends or family, and why do you like it?”')[language]}
          </p>
          <div className="mp-chips">
            <h3>{l('Cosa piace', 'What people like')[language]}</h3>
            <ul>{LIKES.map((x) => <li key={x.en}>{x[language]}</li>)}</ul>
          </div>
          <div className="mp-chips mp-chips--no">
            <h3>{l('Cosa no', 'What they don’t')[language]}</h3>
            <ul>{DISLIKES.map((x) => <li key={x.en}>{x[language]}</li>)}</ul>
          </div>
        </div>
      </div>

      <div className="mp-paper">
        <figure className="mp-paper-photo">
          <img
            src={`${IMG}/paper-prototype.jpg`}
            alt={l(
              'Il prototipo di carta: post-it con ingredienti disegnati a penna e un calderone di carta su un tavolo, mentre una mano sposta un ingrediente',
              'The paper prototype: sticky notes with ingredients drawn in pen and a paper cauldron on a table, while a hand moves an ingredient'
            )[language]}
            width="352"
            height="413"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div>
          <p className="mp-kicker">{l('Il primo prototipo', 'The first prototype')[language]}</p>
          <h3 className="mp-subtitle">{l('Carta, penna e post-it', 'Paper, pen and sticky notes')[language]}</h3>
          <p>
            {l(
              'Prima di scrivere codice abbiamo provato l’idea sul tavolo: gli ingredienti disegnati a penna sui post-it, un calderone di carta e una ricetta da completare. I giocatori si chiedevano gli ingredienti a voce e li spostavano a mano nel calderone.',
              'Before writing any code we tried the idea on a table: ingredients drawn in pen on sticky notes, a paper cauldron and a recipe to complete. Players asked each other for ingredients out loud and moved them into the cauldron by hand.'
            )[language]}
          </p>
          <p>
            {l(
              'Così abbiamo messo alla prova il cuore del gioco, chiedere e passare, prima di disegnare una sola schermata. Poi sono arrivati i test interni e i playtest con piccoli gruppi.',
              'That let us test the heart of the game, asking and passing, before designing a single screen. Internal tests and playtests with small groups came next.'
            )[language]}
          </p>
        </div>
      </div>

      <div className="cs-photos">
        {research.photos.map((s) => (
          <figure key={s.src}>
            <img src={s.src} alt={s.alt[language]} width={s.w} height={s.h} loading="lazy" decoding="async" className="cs-photo" />
            {s.caption && <figcaption className="small muted">{s.caption[language]}</figcaption>}
          </figure>
        ))}
      </div>

      {research.findings && (
        <div className="cs-findings mp-findings">
          <h3>{t.cs.findings}</h3>
          <ul className="cs-role">
            {research.findings.map((f) => (
              <li key={f.en}>{f[language]}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mp-quotes">
        {QUOTES.map((q) => (
          <figure key={q.who}>
            <blockquote lang={language === 'it' ? 'it' : 'en'}>“{q.text[language]}”</blockquote>
            <figcaption className="small muted">{q.who}</figcaption>
          </figure>
        ))}
      </div>
    </Row>
  );
};

/* ── How it plays ─────────────────────────────────────────── */

const MAGES = [
  { id: 'red', name: 'Pyrocaster', bio: l('Trasforma le pozioni in esplosioni e le ricette in “piccoli incidenti felici”. Sicurezza antincendio non inclusa.', 'Turns potions into explosions and recipes into “happy little accidents.” Fire safety not included.') },
  { id: 'blue', name: 'Frostmancer', bio: l('Specialista nel congelare cose che non andrebbero congelate: pozioni, nemici e ogni tanto le proprie mani.', 'Specialises in freezing things that shouldn’t be frozen: potions, enemies, and occasionally his own hands.') },
  { id: 'green', name: 'Mossbinder', bio: l('Esperto di alchimia delle erbe, elisir di palude e dell’arte di spacciare la muffa per un “raro ingrediente magico”.', 'Expert in herbal alchemy, swamp-brewed elixirs, and the fine art of pretending that mould is a “rare magical ingredient”.') },
  { id: 'gray', name: 'Stonemaker', bio: l('Maestro della pietra. Sussurra ai sassi, trasforma la polvere in pozioni e giura che le montagne hanno gli occhi.', 'The master of stone crafting. Whispers to stones, brews dust into potions, and claims mountains have eyes.') },
  { id: 'yellow', name: 'Stormcaller', bio: l('Colpito da un fulmine, l’ha definito “la svolta della carriera”. Da allora insegue quell’estetica.', 'Once struck by lightning and claimed it was “career-defining.” Has been chasing that aesthetic ever since.') },
  { id: 'purple', name: 'Nightbringer', bio: l('Alchimista dell’oscurità: prepara pozioni che sanno di incenso, enigmi e una leggera angoscia esistenziale.', 'An alchemist of darkness, crafting potions that smell like incense, riddles, and mild existential dread.') },
];

export const MPPlay: React.FC = () => {
  const { language } = useLanguage();
  return (
    <section className="mp-play" aria-labelledby="mp-play-title">
      <header className="mp-play-head" {...reveal(0)}>
        <p className="mp-kicker">{l('Il gioco', 'The game')[language]}</p>
        <h2 id="mp-play-title" className="mp-play-title">{l('Come si gioca', 'How it plays')[language]}</h2>
        <p className="mp-play-lead">
          {l(
            'Da 2 a 6 giocatori, un iPhone a testa, i telefoni in cerchio sul tavolo. Nessuno può vincere da solo: ognuno ha bisogno degli ingredienti degli altri.',
            'Two to six players, one iPhone each, the phones in a circle on the table. Nobody can win alone: everyone needs the others’ ingredients.'
          )[language]}
        </p>
      </header>

      <ol className="mp-steps">
        <li className="mp-step mp-step--mages" {...reveal(0)}>
          <div className="mp-step-text">
            <span className="mp-step-n" aria-hidden="true">1</span>
            <h3>{l('Ognuno è un mago', 'Everyone is a mage')[language]}</h3>
            <p>
              {l(
                'Sei maghi, riconoscibili a colpo d’occhio dal colore anche su un telefono dall’altra parte del tavolo. Ognuno ha il suo carattere.',
                'Six mages you can tell apart at a glance by colour, even on a phone across the table. Each has a personality.'
              )[language]}
            </p>
          </div>
          <ul className="mp-mages">
            {MAGES.map((m) => (
              <li key={m.id} className={`mp-mage mp-mage--${m.id}`}>
                <img src={`${IMG}/mage-${m.id}.png`} alt="" width="106" height="159" loading="lazy" decoding="async" className="mp-pixel" />
                <span className="mp-mage-name">{m.name}</span>
                <span className="mp-mage-bio">{m.bio[language]}</span>
              </li>
            ))}
          </ul>
        </li>

        <li className="mp-step" {...reveal(1)}>
          <figure className="mp-visual mp-visual--recipe">
            <img
              src={`${IMG}/round1.png`}
              alt={l('Schermata prima del round 1: “Devi creare un Elisir di Cupido”, con la descrizione della pozione e il conto alla rovescia 3, 2, 1', 'Screen before round 1: “You have to create a Cupid Elixir”, with the potion’s description and a 3, 2, 1 countdown')[language]}
              width="402"
              height="874"
              loading="lazy"
              decoding="async"
              className="mp-phone"
            />
            <img src={`${IMG}/recipe.png`} alt="" width="586" height="178" loading="lazy" decoding="async" className="mp-recipe mp-pixel" />
          </figure>
          <div className="mp-step-text">
            <span className="mp-step-n" aria-hidden="true">2</span>
            <h3>{l('Ricevi una ricetta', 'Get a recipe')[language]}</h3>
            <p>
              {l(
                'Ogni round ha una pozione, con un nome e una storia: nel primo è l’Elisir di Cupido. In cima allo schermo compaiono gli ingredienti che servono a te, e un timer di 20 secondi.',
                'Each round has a potion with a name and a story: in the first one it is the Cupid Elixir. The ingredients you need appear at the top of the screen, with a 20-second timer.'
              )[language]}
            </p>
          </div>
        </li>

        <li className="mp-step" {...reveal(2)}>
          <figure className="mp-visual mp-visual--portals">
            <img src={`${IMG}/portal-green.png`} alt="" width="140" height="405" loading="lazy" decoding="async" className="mp-portal mp-portal--left mp-pixel" />
            <img
              src={`${IMG}/round2-tilt.png`}
              alt={l('Un round in corso: in alto gli ingredienti da trovare, ai lati i portali verso i telefoni vicini, in basso il calderone', 'A round in progress: the ingredients to find at the top, portals to the neighbouring phones at the sides, the cauldron at the bottom')[language]}
              width="545"
              height="870"
              loading="lazy"
              decoding="async"
              className="mp-phone mp-phone--tilt"
            />
            <img src={`${IMG}/portal-red.png`} alt="" width="125" height="361" loading="lazy" decoding="async" className="mp-portal mp-portal--right mp-pixel" />
          </figure>
          <div className="mp-step-text">
            <span className="mp-step-n" aria-hidden="true">3</span>
            <h3>{l('Chiedi a voce, passa dai portali', 'Ask out loud, pass through portals')[language]}</h3>
            <p>
              {l(
                'Gli ingredienti che ti servono sono sui telefoni degli altri, e i tuoi servono a loro. Si urla (“mi serve un occhio verde!”) e si trascina l’ingrediente nel portale verso chi lo cerca.',
                'The ingredients you need are on the others’ phones, and yours are what they need. You shout (“I need a green eye!”) and drag the ingredient into the portal towards whoever is looking for it.'
              )[language]}
            </p>
          </div>
        </li>

        <li className="mp-step" {...reveal(3)}>
          <figure className="mp-visual mp-visual--potions">
            <img src={`${IMG}/potions.png`} alt="" width="510" height="355" loading="lazy" decoding="async" className="mp-potions mp-pixel" />
          </figure>
          <div className="mp-step-text">
            <span className="mp-step-n" aria-hidden="true">4</span>
            <h3>{l('Pozione pronta, prima dello zero', 'Potion done, before zero')[language]}</h3>
            <p>
              {l(
                'Quando tutti hanno messo nel calderone gli ingredienti giusti, la pozione è pronta e si passa al round successivo. Solo insieme si prepara la pozione perfetta.',
                'When everyone has put the right ingredients in their cauldron, the potion is done and the next round begins. Only together can you brew the perfect potion.'
              )[language]}
            </p>
          </div>
        </li>
      </ol>
    </section>
  );
};

/* ── Business model and what comes next ───────────────────── */

const CARDS = [
  { id: 'random-mage', name: l('Mago casuale', 'Random mage'), price: '€2,99', note: l('Un personaggio nuovo a sorpresa', 'A surprise new character') },
  { id: 'alchemist', name: l('Pacchetto alchimista', 'Alchemist package'), price: '€2,99', note: l('Nuove pozioni e ricette', 'New potions and recipes') },
  { id: 'mage-skin', name: l('Skin dei maghi', 'Mage skin package'), price: '€5,99', note: l('Nuovi aspetti per i sei maghi', 'New looks for the six mages') },
  { id: 'no-ads', name: l('Niente pubblicità', 'Remove all ads'), price: '€9,99', note: l('Si gioca senza interruzioni', 'Play without interruptions') },
];

const NEXT = [
  {
    title: l('Più ingredienti per ricetta', 'More ingredients per recipe'),
    body: l('Fino a cinque ingredienti invece di tre, uno dei quali misterioso: più cose da chiedere nello stesso tempo.', 'Up to five ingredients instead of three, one of them a mystery: more to ask for in the same time.'),
  },
  {
    title: l('Etichette enigmatiche', 'Riddle labels'),
    body: l('Al posto del nome, un indovinello da risolvere al volo, mentre gli altri urlano.', 'Instead of a name, a riddle to solve on the fly while the others shout.'),
  },
  {
    title: l('Ingredienti intrappolati negli incantesimi', 'Ingredients trapped in spells'),
    body: l('Prima di passarli bisogna liberarli dall’incantesimo che li tiene chiusi.', 'You have to free them from the spell that holds them before passing them on.'),
  },
];

export const MPBusiness: React.FC = () => {
  const { language } = useLanguage();
  return (
    <>
      <Row title={l('Modello di business', 'Business model')[language]} id="mp-business" wide>
        <p className="lead cs-note">
          {l(
            'Il gioco si scarica e si gioca; chi vuole di più compra contenuti in app: più personaggi, più pozioni, più divertimento.',
            'You download the game and play; players who want more buy in-app content: more characters, more potions, more fun.'
          )[language]}
        </p>
        <ul className="mp-cards">
          {CARDS.map((c) => (
            <li key={c.id}>
              <img src={`${IMG}/card-${c.id}.png`} alt="" width="480" height="614" loading="lazy" decoding="async" />
              <span className="mp-card-name">
                {c.name[language]} <span className="muted">{c.price}</span>
              </span>
              <span className="small muted">{c.note[language]}</span>
            </li>
          ))}
        </ul>
      </Row>

      <Row title={l('Cosa arriva dopo', 'What comes next')[language]} id="mp-next" wide>
        <div className="mp-panel mp-next">
          <img src={`${IMG}/items.png`} alt="" width="777" height="139" loading="lazy" decoding="async" className="mp-items mp-pixel" />
          <p className="mp-riddle">
            <span>{l('Butta nel calderone', 'Throw in the pot')[language]}</span>
            {l('la cosa che ha reso famoso Newton', 'the one thing that made Newton famous')[language]}
          </p>
        </div>
        <div className="cs-decisions mp-next-list">
          {NEXT.map((n) => (
            <div key={n.title.en}>
              <h3>{n.title[language]}</h3>
              <p>{n.body[language]}</p>
            </div>
          ))}
        </div>
      </Row>
    </>
  );
};
