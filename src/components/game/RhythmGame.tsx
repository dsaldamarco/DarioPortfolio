import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { MAIN_PHRASE, type PhraseSegment, type PhraseWord } from './phraseData';
import { gameAudio } from './GameAudio';
import './game.css';

// ─── Types ───────────────────────────────────────────────────────────────────

type GamePhase = 'idle' | 'countdown' | 'playing' | 'ending' | 'score';
type LetterResult = 'pending' | 'active' | 'typed';

interface LetterNode {
  char: string;
  wordIdx: number;
  segmentIdx: number;
}

interface GameStats {
  correct: number;
  errors: number;
  maxCombo: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const KEYBOARD_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M'],
];

function buildLetterNodes(segments: PhraseSegment[]): LetterNode[] {
  const nodes: LetterNode[] = [];
  let wordIdx = 0;
  segments.forEach((seg, segIdx) => {
    seg.words.forEach((word: PhraseWord) => {
      word.keys.forEach((key: string) => {
        nodes.push({ char: key, wordIdx, segmentIdx: segIdx });
      });
      wordIdx++;
    });
  });
  return nodes;
}

function buildWordList(segments: PhraseSegment[]) {
  const words: { display: string; segmentIdx: number; wordIdx: number }[] = [];
  let wordIdx = 0;
  segments.forEach((seg, si) => {
    seg.words.forEach((word: PhraseWord) => {
      words.push({ display: word.display, segmentIdx: si, wordIdx });
      wordIdx++;
    });
  });
  return words;
}

function getScoreMessage(pct: number, lang: 'it' | 'en'): string {
  const m = MAIN_PHRASE.scoreMessages;
  if (pct >= 85) return m.perfect[lang];
  if (pct >= 70) return m.great[lang];
  if (pct >= 55) return m.good[lang];
  return m.ok[lang];
}

// ─── Sub-component: Phrase Display ───────────────────────────────────────────

function PhraseDisplay({
  wordList,
  letterNodes,
  currentLetterIdx,
  letterResults,
}: {
  wordList: ReturnType<typeof buildWordList>;
  letterNodes: LetterNode[];
  currentLetterIdx: number;
  letterResults: LetterResult[];
}) {
  const currentWordIdx = letterNodes[currentLetterIdx]?.wordIdx ?? -1;

  return (
    <div className="phrase-display" aria-live="polite" aria-atomic="false">
      <div className="phrase-words">
        {wordList.map((word, wi) => {
          if (wi > currentWordIdx) return null;
          const isPast = wi < currentWordIdx;

          if (isPast) {
            return (
              <span key={wi} className={`phrase-word phrase-word--done seg-${word.segmentIdx}`}>
                {word.display}
              </span>
            );
          }

          const wordLetterNodes = letterNodes
            .map((n, i) => ({ n, i }))
            .filter(({ n }) => n.wordIdx === wi);

          return (
            <span key={wi} className="phrase-word phrase-word--active">
              {wordLetterNodes.map(({ n, i }) => {
                const result = letterResults[i] ?? 'pending';
                const isCurrent = i === currentLetterIdx;
                return (
                  <span
                    key={i}
                    className={[
                      'phrase-letter',
                      `phrase-letter--${result}`,
                      isCurrent ? 'phrase-letter--current' : '',
                    ].join(' ')}
                  >
                    {n.char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Sub-component: Key Hint (appears after 1.5s of no input) ────────────────

function KeyHint({ letter, lang, lastPressTime }: {
  letter: string | null;
  lang: 'it' | 'en';
  lastPressTime: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    if (!letter) return;
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [letter, lastPressTime]);

  if (!letter) return null;

  return (
    <div className={`key-hint ${visible ? 'key-hint--visible' : ''}`} aria-live="polite">
      <span className="key-hint-label">
        {lang === 'it' ? 'Premi' : 'Press'}
      </span>
      <span className="key-hint-key">{letter}</span>
      <span className="key-hint-arrow">↓</span>
    </div>
  );
}

// ─── Sub-component: Visual Keyboard ──────────────────────────────────────────

function KeyboardDisplay({
  target,
  pressed,
  missed,
}: {
  target: string | null;
  pressed: string | null;
  missed: string | null;
}) {
  return (
    <div className="keyboard-display" aria-hidden="true">
      {KEYBOARD_ROWS.map((row, ri) => (
        <div key={ri} className={`keyboard-row keyboard-row--${ri}`}>
          {row.map((k) => (
            <div
              key={k}
              className={[
                'key-cap',
                k === target  ? 'key-cap--target'  : '',
                k === pressed ? 'key-cap--pressed'  : '',
                k === missed  ? 'key-cap--missed'   : '',
              ].join(' ')}
            >
              {k}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Sub-component: Mobile Tap Interface ─────────────────────────────────────

function MobileTap({
  currentLetter,
  onTap,
}: {
  currentLetter: string | null;
  onTap: (k: string) => void;
}) {
  const [choices, setChoices] = useState<string[]>([]);

  useEffect(() => {
    if (!currentLetter) return;
    const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter((c) => c !== currentLetter);
    const decoys: string[] = [];
    while (decoys.length < 2) {
      const r = pool[Math.floor(Math.random() * pool.length)];
      if (!decoys.includes(r)) decoys.push(r);
    }
    setChoices([currentLetter, ...decoys].sort(() => Math.random() - 0.5));
  }, [currentLetter]);

  if (!currentLetter) return null;

  return (
    <div className="mobile-tap-interface">
      <div className="mobile-current-letter">{currentLetter}</div>
      <div className="mobile-tap-choices">
        {choices.map((c) => (
          <button
            key={c}
            className={`mobile-tap-btn ${c === currentLetter ? 'mobile-tap-btn--target' : ''}`}
            onPointerDown={(e) => { e.preventDefault(); onTap(c); }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function RhythmGame() {
  const { language } = useLanguage();
  const lang = language as 'it' | 'en';
  const segments = MAIN_PHRASE.segments[lang];
  const gameSectionRef = useRef<HTMLElement>(null);

  const letterNodes = useRef<LetterNode[]>(buildLetterNodes(segments));
  const wordList     = useRef(buildWordList(segments));

  const [phase,         setPhase]         = useState<GamePhase>('idle');
  const [countdownNum,  setCountdownNum]   = useState(3);
  const [letterIdx,     setLetterIdx]      = useState(0);
  const [letterResults, setLetterResults]  = useState<LetterResult[]>([]);
  const [combo,         setCombo]          = useState(0);
  const [maxCombo,      setMaxCombo]       = useState(0);
  const [stats,         setStats]          = useState<GameStats>({ correct: 0, errors: 0, maxCombo: 0 });
  const [showCheck,     setShowCheck]      = useState(false);
  const [pressedKey,    setPressedKey]     = useState<string | null>(null);
  const [missedKey,     setMissedKey]      = useState<string | null>(null);
  const [lastPressTime, setLastPressTime]  = useState(0);
  const [isMobile,      setIsMobile]       = useState(false);

  // Refs for closure safety
  const phaseRef      = useRef<GamePhase>('idle');
  const letterIdxRef  = useRef(0);
  const comboRef      = useRef(0);
  const pressTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const missTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const checkTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // Rebuild data on language change
  useEffect(() => {
    letterNodes.current = buildLetterNodes(MAIN_PHRASE.segments[lang]);
    wordList.current = buildWordList(MAIN_PHRASE.segments[lang]);
  }, [lang]);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Advance to next letter on correct key press ──
  const advanceLetter = useCallback((key: string) => {
    const idx   = letterIdxRef.current;
    const nodes = letterNodes.current;

    setLetterResults((prev) => {
      const next = [...prev];
      next[idx] = 'typed';
      if (idx + 1 < nodes.length) next[idx + 1] = 'active';
      return next;
    });

    const newCombo = comboRef.current + 1;
    comboRef.current = newCombo;
    setCombo(newCombo);
    setMaxCombo((prev) => Math.max(prev, newCombo));
    setStats((prev) => ({
      ...prev,
      correct: prev.correct + 1,
      maxCombo: Math.max(prev.maxCombo, newCombo),
    }));

    // Sound feedback — word complete gets a richer sound
    const nodes2 = letterNodes.current;
    const isWordEnd = !nodes2[idx + 1] || nodes2[idx + 1].wordIdx !== nodes2[idx].wordIdx;
    if (isWordEnd) {
      gameAudio.playWordComplete();
    } else {
      gameAudio.playGood();
    }

    // Reset the hint timer by updating lastPressTime
    setLastPressTime(performance.now());

    // ✓ flash
    setShowCheck(true);
    if (checkTimer.current) clearTimeout(checkTimer.current);
    checkTimer.current = setTimeout(() => setShowCheck(false), 380);

    // Key animation
    setPressedKey(key);
    if (pressTimer.current) clearTimeout(pressTimer.current);
    pressTimer.current = setTimeout(() => setPressedKey(null), 180);

    // End of phrase?
    if (idx + 1 >= nodes.length) {
      setPhase('ending');
      phaseRef.current = 'ending';
      const wordCount = wordList.current.length;
      const delay = Math.min(wordCount * 60 + 1800, 3500);
      setTimeout(() => {
        setPhase('score');
        phaseRef.current = 'score';
      }, delay);
      return;
    }

    const nextIdx = idx + 1;
    letterIdxRef.current = nextIdx;
    setLetterIdx(nextIdx);
  }, []);

  // ── Handle any key press ──
  const handleKey = useCallback((rawKey: string) => {
    if (phaseRef.current !== 'playing') return;
    const idx   = letterIdxRef.current;
    const nodes = letterNodes.current;
    if (idx >= nodes.length) return;

    const target  = nodes[idx].char.toUpperCase();
    const pressed = rawKey.toUpperCase();

    if (pressed === target) {
      advanceLetter(pressed);
    } else {
      // Wrong key — shake + combo reset + error sound
      comboRef.current = 0;
      setCombo(0);
      setStats((prev) => ({ ...prev, errors: prev.errors + 1 }));
      setMissedKey(pressed);
      gameAudio.playMiss();
      if (missTimer.current) clearTimeout(missTimer.current);
      missTimer.current = setTimeout(() => setMissedKey(null), 320);
    }
  }, [advanceLetter]);

  // ── Start game ──
  const startGame = useCallback(() => {
    if (phaseRef.current !== 'idle' && phaseRef.current !== 'score') return;

    const segs  = MAIN_PHRASE.segments[lang];
    const nodes = buildLetterNodes(segs);
    letterNodes.current = nodes;
    wordList.current = buildWordList(segs);

    letterIdxRef.current = 0;
    comboRef.current = 0;

    const initResults: LetterResult[] = nodes.map((_, i) => (i === 0 ? 'active' : 'pending'));
    setLetterIdx(0);
    setLetterResults(initResults);
    setCombo(0);
    setMaxCombo(0);
    setStats({ correct: 0, errors: 0, maxCombo: 0 });
    setShowCheck(false);
    setPressedKey(null);
    setMissedKey(null);
    setLastPressTime(performance.now());

    // ── Scroll game section into view so full UI is visible ──
    setTimeout(() => {
      if (gameSectionRef.current) {
        gameSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);

    // Countdown
    setPhase('countdown');
    phaseRef.current = 'countdown';
    setCountdownNum(3);

    let n = 3;
    const tick = setInterval(() => {
      n -= 1;
      setCountdownNum(n);
      if (n <= 0) {
        clearInterval(tick);
        setPhase('playing');
        phaseRef.current = 'playing';
      }
    }, 750);
  }, [lang]);

  // ── Global keyboard listener ──
  useEffect(() => {
    // Use a stable ref wrapper to always call the latest handler
    const keyHandlerRef = { fn: handleKey, start: startGame };
    keyHandlerRef.fn = handleKey;
    keyHandlerRef.start = startGame;

    const onKeyDown = (e: KeyboardEvent) => {
      const p = phaseRef.current;

      // Always block Space from scrolling the page (common reflex while typing)
      if (e.code === 'Space') {
        e.preventDefault();
        // Space is silently ignored during play — doesn't count as a wrong key
        return;
      }

      if (p === 'idle' || p === 'score') {
        if (e.key.length === 1 || e.key === 'Enter') {
          e.preventDefault();
          keyHandlerRef.start();
        }
        return;
      }

      if (p === 'playing' && /^[a-zA-Z]$/.test(e.key)) {
        keyHandlerRef.fn(e.key);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey, startGame]);

  // ── Cleanup timers ──
  useEffect(() => {
    return () => {
      [pressTimer, missTimer, checkTimer].forEach((r) => {
        if (r.current) clearTimeout(r.current);
      });
    };
  }, []);

  // ── Derived values ──
  const totalLetters  = letterNodes.current.length;
  const progress      = totalLetters > 0 ? Math.round((letterIdx / totalLetters) * 100) : 0;
  const currentLetter = letterNodes.current[letterIdx]?.char ?? null;
  const totalAttempts = stats.correct + stats.errors;
  const accuracyPct   = totalAttempts > 0 ? Math.round((stats.correct / totalAttempts) * 100) : 100;

  // ── Render ──
  return (
    <section className="game-section" id="game" ref={gameSectionRef}>
      <div className="game-container">

        {/* Section label */}
        <div className="game-section-label">
          <span className="game-label-text">GAME</span>
          <div className="game-label-line" />
        </div>

        {/* ── IDLE ── */}
        {phase === 'idle' && (
          <div className="game-idle">
            <p className="game-idle-subtitle">
              {lang === 'it' ? 'Pensi di saper scrivere?' : 'Think you can type?'}
            </p>
            <h2 className="game-idle-title">
              {lang === 'it'
                ? 'Premi un tasto per iniziare.'
                : 'Press any key to start.'}
            </h2>
            <div className="game-idle-hint">
              {lang === 'it'
                ? '— digita la frase lettera per lettera —'
                : '— type the phrase letter by letter —'}
            </div>
            <button className="game-start-btn" onClick={startGame}>
              {lang === 'it' ? 'INIZIA' : 'START'}
            </button>
          </div>
        )}

        {/* ── COUNTDOWN ── */}
        {phase === 'countdown' && (
          <div className="game-countdown">
            <div className="countdown-number" key={countdownNum}>
              {countdownNum === 0 ? '▶' : countdownNum}
            </div>
          </div>
        )}

        {/* ── PLAYING ── */}
        {phase === 'playing' && (
          <div className="game-playing">

            {/* Progress bar + combo */}
            <div className="game-hud">
              <div className="game-progress">
                <div className="game-progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <div className="game-combo">
                {combo >= 3 && (
                  <span key={combo} className={`combo-badge combo-x${Math.min(Math.floor(combo / 3) + 1, 3)}`}>
                    {combo}×
                  </span>
                )}
              </div>
            </div>

            {/* Phrase building display */}
            <PhraseDisplay
              wordList={wordList.current}
              letterNodes={letterNodes.current}
              currentLetterIdx={letterIdx}
              letterResults={letterResults}
            />

            {/* ✓ flash on correct key */}
            {showCheck && (
              <div className="feedback-flash feedback-flash--perfect">✓</div>
            )}

            {/* Delayed hint tooltip */}
            <KeyHint
              letter={currentLetter}
              lang={lang}
              lastPressTime={lastPressTime}
            />

            {/* Keyboard or mobile tap */}
            {isMobile ? (
              <MobileTap currentLetter={currentLetter} onTap={handleKey} />
            ) : (
              <KeyboardDisplay
                target={currentLetter}
                pressed={pressedKey}
                missed={missedKey}
              />
            )}
          </div>
        )}

        {/* ── ENDING ── */}
        {phase === 'ending' && (
          <div className="game-ending">
            <div className="ending-phrase">
              {wordList.current.map((word, i) => (
                <span
                  key={i}
                  className="ending-word"
                  style={{ animationDelay: `${i * 0.055}s` }}
                >
                  {word.display}
                </span>
              ))}
            </div>
            <div className="ending-payoff">{MAIN_PHRASE.ending[lang]}</div>
          </div>
        )}

        {/* ── SCORE ── */}
        {phase === 'score' && (
          <div className="game-score">
            <div className="score-accuracy">{accuracyPct}%</div>
            <div className="score-label">
              {lang === 'it' ? 'accuratezza' : 'accuracy'}
            </div>
            <p className="score-message">{getScoreMessage(accuracyPct, lang)}</p>

            <div className="score-stats">
              <div className="score-stat">
                <span className="score-stat-val">{stats.correct}</span>
                <span className="score-stat-lbl">{lang === 'it' ? 'Corrette' : 'Correct'}</span>
              </div>
              <div className="score-stat">
                <span className="score-stat-val">{stats.errors}</span>
                <span className="score-stat-lbl">{lang === 'it' ? 'Errori' : 'Errors'}</span>
              </div>
              <div className="score-stat">
                <span className="score-stat-val">{maxCombo}×</span>
                <span className="score-stat-lbl">Max Combo</span>
              </div>
            </div>

            <div className="score-actions">
              <button className="score-retry-btn" onClick={startGame}>
                {lang === 'it' ? 'RIGIOCA' : 'PLAY AGAIN'}
              </button>
              <a
                href="#projects"
                className="score-work-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {lang === 'it' ? '→ Vedi i progetti' : '→ See the projects'}
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
