export type SegmentMood = 'calm' | 'building' | 'drop' | 'climax' | 'meta' | 'payoff';
export type GameLanguage = 'it' | 'en';

export interface PhraseWord {
  display: string; // Visual string shown on screen (e.g. "I'M")
  keys: string[];  // Chars to type (e.g. ['I', 'M'])
}

export interface PhraseSegment {
  words: PhraseWord[];
  bpm: number;
  mood: SegmentMood;
}

export interface ScoreMessages {
  perfect: Record<GameLanguage, string>;
  great: Record<GameLanguage, string>;
  good: Record<GameLanguage, string>;
  ok: Record<GameLanguage, string>;
}

export interface PhraseConfig {
  id: string;
  segments: Record<GameLanguage, PhraseSegment[]>;
  ending: Record<GameLanguage, string>;
  scoreMessages: ScoreMessages;
}

function w(display: string): PhraseWord {
  return { display, keys: display.split('') };
}

export const MAIN_PHRASE: PhraseConfig = {
  id: 'main',
  segments: {
    it: [
      {
        words: ['OK', 'LO', 'SO', 'CHE', 'STAI'].map(w),
        bpm: 72,
        mood: 'calm',
      },
      {
        words: ['ASPETTANDO', 'I', 'SOLITI', 'LAYOUT', 'FIGHI'].map(w),
        bpm: 84,
        mood: 'building',
      },
      {
        words: ['MA', 'SORPRESA'].map(w),
        bpm: 90,
        mood: 'drop',
      },
      {
        words: ['SO', 'ANCHE', 'PROGRAMMARE'].map(w),
        bpm: 100,
        mood: 'climax',
      },
      {
        words: ['QUESTO', 'CHE', 'STAI', 'USANDO', 'ORA'].map(w),
        bpm: 96,
        mood: 'meta',
      },
      {
        words: ['QUINDI', 'ASSUMETEMI', 'CERCO', 'LAVORO'].map(w),
        bpm: 110,
        mood: 'payoff',
      },
    ],
    en: [
      {
        words: ['OK', 'I', 'KNOW', 'YOU', 'CAME', 'HERE'].map(w),
        bpm: 72,
        mood: 'calm',
      },
      {
        words: ['FOR', 'THE', 'NICE', 'PIXELS'].map(w),
        bpm: 84,
        mood: 'building',
      },
      {
        words: ['BUT', 'SURPRISE'].map(w),
        bpm: 90,
        mood: 'drop',
      },
      {
        words: ['I', 'ALSO', 'CODE', 'THIS', 'VERY', 'THING'].map(w),
        bpm: 100,
        mood: 'climax',
      },
      {
        words: ['YOU', 'ARE', 'PLAYING', 'NOW'].map(w),
        bpm: 96,
        mood: 'meta',
      },
      {
        words: [
          { display: 'SO', keys: ['S', 'O'] },
          { display: "I'M", keys: ['I', 'M'] },
          { display: 'LOOKING', keys: ['L', 'O', 'O', 'K', 'I', 'N', 'G'] },
          { display: 'FOR', keys: ['F', 'O', 'R'] },
          { display: 'A', keys: ['A'] },
          { display: 'JOB', keys: ['J', 'O', 'B'] },
        ],
        bpm: 110,
        mood: 'payoff',
      },
    ],
  },
  ending: {
    it: 'Non male, vero?\nOra assumimi.',
    en: 'Not bad, right?\nNow hire me.',
  },
  scoreMessages: {
    perfect: {
      it: 'Timing impeccabile. Candidatura accettata.',
      en: 'Impeccable timing. Application accepted.',
    },
    great: {
      it: 'Quasi perfetto. Come il mio portfolio.',
      en: 'Almost perfect. Like my portfolio.',
    },
    good: {
      it: "Ci vuole pratica. Come per fare buona UX.",
      en: "Needs some practice. Like doing good UX.",
    },
    ok: {
      it: 'Ok ma forse riprova. O assumimi comunque.',
      en: 'Ok but try again. Or just hire me anyway.',
    },
  },
};
