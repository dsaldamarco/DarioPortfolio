---
name: Dario Saldamarco Portfolio
description: A UX/UI designer's portfolio built as his own home screen: real app icons first, each one opens its case study.
colors:
  ground: "#ebe5e3"
  surface: "#e1dad7"
  field: "#ddd4d0"
  field-deep: "#d4cac5"
  ink: "#2b2622"
  muted: "#564d49"
  night: "#26211e"
  night-ink: "#efeae8"
  night-muted: "#bbb1ac"
  accent: "#0f7d45"
  accent-ink: "#ffffff"
  screen: "#0e0f10"
  screen-ink: "#f1f1ee"
typography:
  display:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1rem + 5.4vw, 5.75rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.045em"
  head:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 3.2vw, 4rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.04em"
  lead:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.005em"
  small:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  panel: "24px"
  pill: "999px"
  icon: "22.5%"
spacing:
  margin: "clamp(16px, 3.2vw, 48px)"
  section: "clamp(96px, 12vw, 200px)"
  max: "1440px"
components:
  button-primary:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
  button-quiet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-quiet-hover:
    backgroundColor: "{colors.field}"
  button-on-night:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.pill}"
  panel-field:
    backgroundColor: "{colors.field}"
    rounded: "{rounded.panel}"
  panel-field-deep:
    backgroundColor: "{colors.field-deep}"
    rounded: "{rounded.panel}"
  panel-screen:
    backgroundColor: "{colors.screen}"
    textColor: "{colors.screen-ink}"
    rounded: "{rounded.panel}"
---

# Design System: Dario Saldamarco Portfolio

## Overview

The page is Dario's home screen. The first viewport shows the six real app icons he designed, laid out as an iOS home screen (names only, like iOS) on a rose-grey ground, and every icon opens its case study the way an app launches (a view transition grows the icon into the case study header). Everything else is built from the same grammar: flat fields like widgets, one grotesk, squircle icons as the only ornament, and real screens and field photographs as the pictures.

Key characteristics: one typeface at two dominant sizes; colour as whole fields per chapter, never accents scattered on a neutral; no lines, no shadows at rest, no gradients; real content only (no invented metrics).

## Colors

A restrained palette: one rose-grey ground, tone steps for fields, brown-black ink, a dark close, and green used sparingly (dealt by taste-skill's palette draw, chosen after the user rejected the earlier slate ground as not premium enough).

### Primary
- **Ink** `#2b2622` / **Night** `#26211e`: primary buttons are dark ink pills; the contact close is a night field with `#efeae8` text.

### Accent
- **Green** `#0f7d45` with white text: only on button hover, the focus ring and the single footer button ("Copia indirizzo").

### Neutral
- **Ground** `#ebe5e3`: the page from top to bottom.
- **Surface** `#e1dad7`: quiet buttons, language switch, active index rows, process cards.
- **Field** `#ddd4d0` and **Field deep** `#d4cac5`: stages, the CV band, the letter, the phone preview.
- **Muted** `#564d49`: meta, labels, captions (passes 4.5:1 on every field).
- **Screen** `#0e0f10`: real dark interface fragments (You Can Only screens).

### Named Rules
- **The Tone-Step Rule**: chapters change by a step in field tone, never by drawing a line.
- **Green Is Rare**: the accent appears on interaction and one footer button, nowhere at rest.

## Typography

Hanken Grotesk 400/500 (Google Fonts), one family for everything; italic only for the letter's sign-off.

### Hierarchy
- **Display** (5.75rem max, 400, -0.045em, 0.95): the page title and case study titles, two lines at most.
- **Head** (4rem max, 400, -0.04em): section titles, evidence figures, the next-project link.
- **Lead** (1.625rem max): summaries, intros, case study row titles.
- **Body** (17–19px, 1.5): all running text, in full ink.
- **Small** (14–15px): meta, labels, captions. Nothing smaller.

### Named Rules
- **Scale Does the Work**: hierarchy comes from size and weight steps, never from colour accents, italics in headlines, uppercase tracking or monospace.

## Layout

One frame: max 1440px, equal outer margins `clamp(16px, 3.2vw, 48px)`, a 12-column grid inside. Sections sit `clamp(96px, 12vw, 200px)` apart. Each home section has its own composition: home screen (title over a 5/7 split of text and icon grid), featured project (8/4 stage and facts, then three story columns), shipped project (5/7 text and dark screen stage), index (7/5 list and sticky preview), letter (7/5 sheet and photograph), CV band (two columns plus skills), contact. Case studies use spec-sheet rows: heading in 3 columns, content in 9.

## Elevation & Depth

Flat. Surfaces separate by a tone step (ground → surface → field), never by shadow or border. The only "depth" is the icon's lift on hover.

## Shapes

- Panels and fields: 24px radius, like iOS widgets.
- Buttons and the language switch: full pill.
- App icons: squircle at 22.5% radius; icons exported with transparent padding are scaled to fill (`.app-icon--inset`).
- Photographs: 24px radius, cropped 3:2 or 4:5.

## Components

### Buttons
Pill, 48px tall, flat fill. Primary is dark ink; quiet is surface; on the night field the button is green. Press scales to 0.97 in 160ms; hover turns green on fine pointers only.

### Cards / Containers
No card grids. Panels are coloured fields holding one thing (a stage, a letter, a preview). Process steps are the only repeated tiles, on surface.

### Navigation
A plain sticky bar on the ground colour: avatar and name (plus a back link on case studies), three section links with a growing underline, IT/EN pill switch, dark "Scrivimi" mailto button.

### App Icon (signature component)
Squircle icon, name in body weight 500 and kind in small muted text, centred like an iOS label. Press scales to 0.92; hover lifts 6px. Clicking navigates with a view transition named `launch-icon` that lands on the case study header icon.

## Do's and Don'ts

### Do:
- Show real screens and real field photographs; label nothing as a result that was not measured.
- Keep headlines to two lines at every width.
- Keep every control keyboard reachable with the green focus ring (2px, offset 3px).
- Respect reduced motion: entrances fade without travel; view transitions and the crossfade switch off.

### Don't:
- Don't add eyebrows, section numbers, monospace labels, hairline rules, outlined boxes, gradients, glass or resting shadows.
- Don't introduce a second typeface or a violet/neon accent.
