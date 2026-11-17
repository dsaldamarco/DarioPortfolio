import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Segmented } from './ui';
import { CloseIcon, DownloadIcon } from './icons';
import {
  BACKGROUNDS,
  GIF_MOTIONS,
  PHOTO_ANGLES,
  captureGif,
  capturePhoto,
  markVisibleSide,
  saveFiles,
  sideForAngle,
  slug,
} from '../lib/exportCard';

const TABS = [
  { value: 'photo', label: 'Foto' },
  { value: 'gif', label: 'GIF animata' },
];
const SIDES = [
  { value: 'front', label: 'Fronte' },
  { value: 'back', label: 'Retro' },
];
const GIF_BACKGROUNDS = BACKGROUNDS.filter((b) => b.color); // GIF alpha is 1-bit: no soft shadows
const GIF_FRAMES = 30;
const GIF_DELAY = 60; // ms → 1.8 s loop

/**
 * Save the card as PNG (several angles) or animated GIF.
 * While open, the card is locked and shows exactly what will be saved.
 */
export default function ExportDialog({ open, onClose, cardRef, cardName, flipped }) {
  const [tab, setTab] = useState('photo');
  const [angle, setAngle] = useState('right');
  const [side, setSide] = useState('front');
  const [photoBg, setPhotoBg] = useState('transparent');
  const [gifBg, setGifBg] = useState('dark');
  const [gifMotion, setGifMotion] = useState('sway');
  const [busy, setBusy] = useState(null); // null | { label, progress }
  const [error, setError] = useState('');
  const abortRef = useRef(null);
  const closeRef = useRef(null);

  const card = () => cardRef.current;
  const node = () => card()?.captureNode();
  const angleDeg = (s) => card().sideAngles()[s];
  const name = slug(cardName);

  // Start on the face the user was looking at.
  useEffect(() => {
    if (open) {
      setSide(flipped ? 'back' : 'front');
      setError('');
    }
  }, [open, flipped]);

  // Lock the card while the dialog is open; release on close.
  useEffect(() => {
    if (!open) return;
    card()?.lock(true);
    closeRef.current?.focus();
    return () => {
      const n = node();
      if (n) markVisibleSide(n, null);
      card()?.lock(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Live preview of what will be saved (paused while exporting).
  useEffect(() => {
    if (!open || busy || !card()) return;
    if (tab === 'photo') {
      const preset = PHOTO_ANGLES.find((a) => a.value === angle);
      card().setPose({ ...preset.pose, flip: angleDeg(side) });
      return;
    }
    const m = GIF_MOTIONS.find((g) => g.value === gifMotion);
    const base = angleDeg(side);
    const loopMs = GIF_FRAMES * GIF_DELAY;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = m.pose(((now - start) % loopMs) / loopMs);
      card().setPose({ ...p, flip: base + (p.flipOffset ?? 0) });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, busy, tab, angle, side, gifMotion]);

  // Esc closes (unless an export is running).
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && !busy && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, busy, onClose]);

  const run = async (label, job) => {
    setError('');
    setBusy({ label, progress: 0 });
    try {
      await job();
    } catch (err) {
      if (err?.name !== 'AbortError') setError('Non sono riuscito a creare il file. Riprova.');
      console.error(err);
    } finally {
      markVisibleSide(node(), null);
      setBusy(null);
    }
  };

  const photoOf = async (a) => {
    const preset = PHOTO_ANGLES.find((p) => p.value === a);
    card().setPose({ ...preset.pose, flip: angleDeg(side) });
    markVisibleSide(node(), side);
    const background = BACKGROUNDS.find((b) => b.value === photoBg).color;
    return capturePhoto(node(), { width: 1400, background });
  };

  const savePhoto = () =>
    run('Creo la foto…', async () => {
      const blob = await photoOf(angle);
      await saveFiles([{ blob, name: `holo-${name}-${side === 'back' ? 'retro-' : ''}${angle}.png` }]);
    });

  const saveAllPhotos = () =>
    run('Creo le foto…', async () => {
      const files = [];
      for (const [i, a] of PHOTO_ANGLES.entries()) {
        files.push({
          blob: await photoOf(a.value),
          name: `holo-${name}-${side === 'back' ? 'retro-' : ''}${a.value}.png`,
        });
        setBusy({ label: 'Creo le foto…', progress: (i + 1) / PHOTO_ANGLES.length });
      }
      await saveFiles(files);
    });

  const saveGif = () =>
    run('Creo la GIF…', async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      const m = GIF_MOTIONS.find((g) => g.value === gifMotion);
      const base = angleDeg(side);
      const n = node();
      const blob = await captureGif(n, {
        frames: GIF_FRAMES,
        delay: GIF_DELAY,
        width: 520,
        background: BACKGROUNDS.find((b) => b.value === gifBg).color,
        signal: controller.signal,
        onProgress: (p) => setBusy({ label: 'Creo la GIF…', progress: p }),
        applyPose: (i) => {
          const p = m.pose(i / GIF_FRAMES);
          const deg = base + (p.flipOffset ?? 0);
          markVisibleSide(n, sideForAngle(deg));
          card().setPose({ ...p, flip: deg });
        },
      });
      await saveFiles([{ blob, name: `holo-${name}-${gifMotion}.gif` }]);
    });

  const spin = gifMotion === 'spin';

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Light scrim: keeps the card visible (it previews the export) but blocks the pointer */}
          <motion.div
            key="scrim"
            className="fixed inset-0 z-40 bg-black/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !busy && onClose()}
          />
          <motion.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="export-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 38 }}
            className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[420px] rounded-[28px] bg-panel p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_20px_60px_rgb(0_0_0/0.6)] ring-1 ring-white/10 backdrop-blur-2xl backdrop-saturate-150"
          >
            <header className="mb-3 flex items-center justify-between px-1">
              <h2 id="export-title" className="text-[17px] font-semibold tracking-tight">
                Salva la carta
              </h2>
              <button
                ref={closeRef}
                type="button"
                aria-label="Chiudi"
                disabled={Boolean(busy)}
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.08] text-white/70 outline-none hover:bg-white/[0.14] focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-40"
              >
                <CloseIcon width={16} height={16} />
              </button>
            </header>

            <fieldset disabled={Boolean(busy)} className="space-y-3.5">
              <Segmented label="Formato" options={TABS} value={tab} onChange={setTab} />

              {tab === 'photo' ? (
                <>
                  <Field label="Angolazione">
                    <div role="radiogroup" aria-label="Angolazione" className="grid grid-cols-5 gap-1.5">
                      {PHOTO_ANGLES.map((a) => (
                        <Chip key={a.value} active={angle === a.value} onClick={() => setAngle(a.value)}>
                          {a.label}
                        </Chip>
                      ))}
                    </div>
                  </Field>
                  <Field label="Faccia">
                    <Segmented label="Faccia" options={SIDES} value={side} onChange={setSide} />
                  </Field>
                  <Field label="Sfondo">
                    <Segmented label="Sfondo" options={BACKGROUNDS} value={photoBg} onChange={setPhotoBg} />
                  </Field>
                </>
              ) : (
                <>
                  <Field label="Movimento">
                    <Segmented label="Movimento" options={GIF_MOTIONS} value={gifMotion} onChange={setGifMotion} />
                  </Field>
                  <Field label={spin ? 'Parte da' : 'Faccia'}>
                    <Segmented label="Faccia" options={SIDES} value={side} onChange={setSide} />
                  </Field>
                  <Field label="Sfondo" hint="Le GIF non gestiscono bene la trasparenza delle ombre.">
                    <Segmented label="Sfondo" options={GIF_BACKGROUNDS} value={gifBg} onChange={setGifBg} />
                  </Field>
                </>
              )}
            </fieldset>

            {error && (
              <p role="alert" className="mt-3 px-1 text-[12px] text-[#ff6961]">
                {error}
              </p>
            )}

            <div className="mt-4">
              {busy ? (
                <div className="space-y-2.5" role="status" aria-live="polite">
                  <div className="flex items-center justify-between px-1 text-[13px]">
                    <span>{busy.label}</span>
                    <span className="tabular-nums text-label">{Math.round(busy.progress * 100)}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-white transition-[width] duration-200"
                      style={{ width: `${busy.progress * 100}%` }}
                    />
                  </div>
                  {tab === 'gif' && (
                    <button
                      type="button"
                      onClick={() => abortRef.current?.abort()}
                      className="w-full rounded-full py-2 text-[14px] text-accent outline-none hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Annulla
                    </button>
                  )}
                </div>
              ) : tab === 'photo' ? (
                <div className="flex gap-2">
                  <PrimaryButton onClick={savePhoto}>
                    <DownloadIcon width={18} height={18} /> Salva PNG
                  </PrimaryButton>
                  <SecondaryButton onClick={saveAllPhotos}>Tutte e 5</SecondaryButton>
                </div>
              ) : (
                <PrimaryButton onClick={saveGif}>
                  <DownloadIcon width={18} height={18} /> Crea GIF
                </PrimaryButton>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <span className="block px-1 text-[12px] text-label">{label}</span>
      {children}
      {hint && <span className="block px-1 text-[11px] leading-snug text-white/40">{hint}</span>}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`rounded-[10px] px-1 py-2 text-[12px] font-medium leading-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent ${
        active ? 'bg-white text-black' : 'bg-white/[0.07] text-white/75 hover:bg-white/[0.12]'
      }`}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-[15px] font-semibold text-black outline-none transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1c20]"
    >
      {children}
    </button>
  );
}

function SecondaryButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-white/[0.1] px-4 py-3 text-[15px] font-medium text-white outline-none transition hover:bg-white/[0.16] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent"
    >
      {children}
    </button>
  );
}
