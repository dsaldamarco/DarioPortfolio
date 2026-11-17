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
| Carica immagine o file a livelli | pulsante ↑, drag & drop ovunque, o incolla (Ctrl/⌘+V) | pulsante ↑ |

Upload, drop e incolla vanno sulla faccia visibile: se la carta mostra il retro,
l'immagine finisce sul retro (un file a livelli lì viene unito in un'immagine sola).

## Livelli e parallasse 2.5D

Il fronte è sempre una pila di livelli. Un'immagine singola è un livello a
profondità 0 (identica a prima); un file a livelli diventa una pila che si
muove in parallasse quando la carta si inclina.

| Formato | Cosa viene letto |
| --- | --- |
| `.psd` / `.psb` (Photoshop, Fresco, Affinity…) | tutti i livelli con posizione, opacità, metodo di fusione; gruppi appiattiti, maschere di livello e maschere di ritaglio applicate |
| `.procreate` | livelli, opacità, nascosti, ritaglio; orientamento della tela verificato sull'anteprima del file. Se il file non è leggibile si usa l'anteprima piatta |
| `.ora` (OpenRaster: Krita, GIMP, MyPaint) | livelli e gruppi con posizione e opacità |
| `.tif` / `.tiff` | ogni pagina è un livello. I livelli interni dei TIFF di Photoshop non sono leggibili: si usa l'immagine unita |
| `.kra` (Krita) | solo l'immagine unita (meglio esportare in .ora o .psd) |
| `.zip` o più immagini insieme | ogni immagine è un livello, in ordine di nome; le immagini senza trasparenza vanno in fondo |

I livelli nascosti nel file arrivano spenti, si possono riaccendere.
Il documento viene ridotto a 2048 px sul lato lungo (basta per l'export a 1400 px).

Sezione **Livelli** del pannello, per ogni livello:

- **Visibilità** (occhio).
- **Profondità** da −40 a +40 px (doppio clic azzera). Negativo = dietro la carta, positivo = sporge.
- **Ombra**: ombra sotto il livello che scivola in direzione opposta all'inclinazione.
- **Sopra holo**: il livello resta nitido sopra foil e glitter (testi, cornici, UI).

Più **Profondità automatica** (dal fondo −24 alla cima +32), **Azzera**, e
**I livelli coprono: Illustrazione / Carta intera**. In "Carta intera" il file
è la carta: cornice e testi della carta vengono nascosti. Si sceglie da solo
quando il documento ha le proporzioni di una carta (63:88).

Come funziona (`ArtLayers.jsx`): la faccia della carta deve restare piatta
(ritaglio con angoli arrotondati e `mix-blend-mode` del foil), quindi un
`translateZ` vero lì dentro verrebbe schiacciato. Ogni livello riceve lo
spostamento esatto che `translateZ(profondità)` produrrebbe con l'inclinazione
corrente: `x = d · tan(rotateY)`, `y = −d · tan(rotateX)`, calcolato in CSS
dalle stesse variabili `--rx --ry`. Cambia solo `transform`, quindi niente
render React e niente repaint durante il movimento. Misurato contro un
elemento con `translateZ` reale: differenza sotto 0,3 px.

I parser (`src/lib/layers/`) si caricano solo quando servono: ag-psd per i PSD,
fflate per gli archivi ZIP, UTIF per i TIFF; LZO/LZ4 (tile di Procreate) e la
plist binaria di Procreate sono implementati lì dentro.

## Retro personalizzabile

Sezione **Retro** del pannello (modificarla gira la carta in automatico):

- **Pattern**: 5 motivi in CSS (Anelli, Rombi, Onde, Pois, Raggi) × 5 colori.
- **Immagine**: un'immagine caricata copre tutto il retro.
- **Motivo**: l'immagine caricata viene ripetuta come pattern, con dimensione regolabile.
- Emblema sì/no, titolo e sottotitolo modificabili, "Oscura dietro al testo"
  per leggere il testo sopra le immagini.

Senza immagine caricata, Immagine e Motivo mostrano il pattern scelto.

## Salva foto o GIF

Pulsante ↓ in alto. Mentre il pannello è aperto la carta si blocca e mostra
esattamente quello che verrà salvato.

- **Foto (PNG, 1400 px)**: 5 angolazioni, fronte o retro, sfondo trasparente,
  scuro o chiaro. "Tutte e 5" salva tutte le angolazioni in un colpo.
- **GIF animata (520 px, 30 fotogrammi, loop 1,8 s)**: Oscilla, Orbita o
  Giro 360°, sfondo scuro o chiaro (le GIF non gestiscono le ombre trasparenti).
- Su telefono si apre il foglio di condivisione, da cui si salva in Foto.

Come funziona (`src/lib/exportCard.js`): `setPose` della fisica mette la carta
in una posa esatta e scrive subito gli stili; modern-screenshot rasterizza il
DOM vero (stessi blend mode del live); gifenc codifica i fotogrammi.
Due accorgimenti necessari:

- il rasterizzatore ignora `backface-visibility`, quindi durante l'export
  `data-capture` sulla carta nasconde la faccia girata;
- le maschere del glitter sono PNG generati su canvas (`src/lib/noise.js`):
  le texture SVG `feTurbulence` non vengono rese nell'export.

## Struttura

```
src/
├─ App.jsx                  shell: top bar, stage, upload, drag&drop, tastiera
├─ settings.js              valori di default e opzioni (stili, cornici)
├─ hooks/
│  ├─ useCardPhysics.js     puntatore → motion values → spring → CSS vars
│  └─ useMediaQuery.js
├─ lib/layers/             lettura file a livelli (PSD, Procreate, TIFF, ORA, ZIP)
├─ components/
│  ├─ HoloCard.jsx          stage 3D (perspective, tilt, flip, ombra)
│  ├─ CardFront.jsx         layout fronte
│  ├─ ArtLayers.jsx         pila di livelli con parallasse
│  ├─ LayersPanel.jsx       sezione Livelli del pannello
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
