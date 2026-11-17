# Holo Studio

Carta collezionabile interattiva con effetto olografico, tilt 3D a molla e flip.
React 19 · Vite · Tailwind CSS v4 · Framer Motion.

```bash
npm install
npm run dev
```

## Interazioni

| Azione | Mouse | Touch |
| --- | --- | --- |
| Inclinazione 3D + riflessi | muovi il cursore sulla carta | tocca e muovi il dito |
| Ritorno a riposo (spring) | esci dalla carta | solleva il dito |
| Flip | pulsante ↻, tasto **F**, o trascina in orizzontale | pulsante ↻ o swipe orizzontale |
| Carica immagine | pulsante ↑, drag & drop ovunque, o incolla (Ctrl/⌘+V) | pulsante ↑ |

## Struttura

```
src/
├─ App.jsx                  shell: top bar, stage, upload, drag&drop, tastiera
├─ settings.js              valori di default e opzioni (stili, cornici)
├─ hooks/
│  ├─ useCardPhysics.js     puntatore → motion values → spring → CSS vars
│  └─ useMediaQuery.js
├─ components/
│  ├─ HoloCard.jsx          stage 3D (perspective, tilt, flip, ombra)
│  ├─ CardFront.jsx         layout fronte
│  ├─ CardBack.jsx          retro
│  ├─ HoloLayers.jsx        foil + glitter
│  ├─ ControlPanel.jsx      pannello laterale (desktop) / bottom sheet (mobile)
│  ├─ ImageDropzone.jsx
│  ├─ ui.jsx                Slider, Segmented, Swatches, TextField, IconButton
│  └─ icons.jsx
└─ styles/holo.css          tutto l'effetto olografico
```

## Come funziona l'effetto

`useCardPhysics` scrive la posizione del puntatore e l'inclinazione in **motion values**
di Framer Motion, passate attraverso `useSpring`. Lo stage le espone come variabili CSS
senza unità (`--px --py --rx --ry --hyp --active`). Muovere il puntatore non fa mai
ri-renderizzare React: tutto avviene sul percorso di animazione di Framer.

`holo.css` usa quelle variabili per:

- **Foil** (`.holo-foil`): gradienti ripetuti arcobaleno + bande metalliche, con
  `background-position` e angolo guidati dal puntatore, fusi con `mix-blend-mode: color-dodge`.
  Varianti `rainbow`, `galaxy`, `gold`, `prism` tramite `data-holo`.
- **Glitter** (`.holo-sparkle`): due texture di rumore SVG (`feTurbulence`) usate come
  maschera in intersezione; una si muove col puntatore, quindi i singoli punti
  appaiono e scompaiono: luccichio.
- **Riflesso** (`.card-glare`): gradiente radiale centrato sul puntatore in `overlay`.
  Sul retro è specchiato, perché la faccia è ruotata di 180°.
- **Ombra**: elemento piatto fuori dal contesto 3D, mosso solo con `transform`.

Dimensioni, testo e bordi usano container query units (`cqw`), quindi la carta scala
in modo proporzionale a qualunque larghezza.

## Personalizzazione

Nuovo stile holo: aggiungi una voce in `HOLO_STYLES` (`settings.js`) e un blocco
`.card-stage[data-holo='nome'] .holo-foil { … }` in `holo.css`.
Nuova cornice: voce in `FRAMES` + `.card-stage[data-frame='nome'] { --frame-bg: …; --accent: … }`.
