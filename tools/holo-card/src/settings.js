export const DEFAULT_IMAGE = `${import.meta.env.BASE_URL}default-art.svg`;

export const DEFAULT_SETTINGS = {
  // Holo
  holoStyle: 'rainbow',
  intensity: 0.8,
  sparkle: 0.6,
  glare: 0.7,
  foilArea: 'art',
  // Frame
  frame: 'silver',
  border: 3.2, // cqw
  radius: 4.8, // cqw
  // Physics
  tilt: 14, // max degrees
  // Text
  name: 'Aurora Synth',
  subtitle: 'Cosmo',
  description:
    'Nasce dove il tramonto incontra l’orizzonte digitale. Ogni riflesso sulla sua superficie racconta una luce diversa.',
  number: 'HS · 001/151',
};

export const HOLO_STYLES = [
  { value: 'rainbow', label: 'Rainbow' },
  { value: 'galaxy', label: 'Galaxy' },
  { value: 'gold', label: 'Gold' },
  { value: 'prism', label: 'Prism' },
];

export const FOIL_AREAS = [
  { value: 'art', label: 'Illustrazione' },
  { value: 'full', label: 'Carta intera' },
];

export const FRAMES = [
  {
    value: 'silver',
    label: 'Argento',
    swatch: 'linear-gradient(135deg,#f5f5f7,#a4a4ad 30%,#ececf1 55%,#85858f)',
  },
  {
    value: 'gold',
    label: 'Oro',
    swatch: 'linear-gradient(135deg,#fbe7a1,#c79233 30%,#fff3c7 55%,#a8761f)',
  },
  {
    value: 'obsidian',
    label: 'Ossidiana',
    swatch: 'linear-gradient(135deg,#46464d,#141416 45%,#34343a 65%,#0b0b0c)',
  },
  {
    value: 'prism',
    label: 'Prisma',
    swatch: 'conic-gradient(from 210deg,#ff7a9c,#ffd36b,#8dffb0,#6bd8ff,#a77bff,#ff7ad9,#ff7a9c)',
  },
];

export const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml'];
export const MAX_FILE_MB = 25;
