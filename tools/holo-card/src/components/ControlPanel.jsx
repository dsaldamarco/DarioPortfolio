import { AnimatePresence, motion } from 'framer-motion';
import ImageDropzone from './ImageDropzone';
import { Section, Segmented, Slider, Swatches, TextField } from './ui';
import { CloseIcon } from './icons';
import { BACK_MODES, BACK_PATTERNS, BACK_TINTS, FOIL_AREAS, FRAMES, HOLO_STYLES } from '../settings';

const pct = (v) => `${Math.round(v * 100)}%`;
const YES_NO = [
  { value: true, label: 'Sì' },
  { value: false, label: 'No' },
];

/** Mini card-backs rendered with the same CSS as the real back. */
function PatternPicker({ value, tint, onChange }) {
  return (
    <div role="radiogroup" aria-label="Pattern del retro" className="grid grid-cols-5 gap-2">
      {BACK_PATTERNS.map((p) => {
        const active = p.value === value;
        return (
          <button
            key={p.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(p.value)}
            className="group flex flex-col items-center gap-1.5 outline-none"
          >
            <span
              className={`pattern-swatch transition-all duration-200 group-focus-visible:ring-2 group-focus-visible:ring-accent ${
                active
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1c1c20]'
                  : 'ring-1 ring-white/10 group-hover:ring-white/30'
              }`}
              data-tint={tint}
            >
              <span className="back-pattern" data-pattern={p.value} />
            </span>
            <span className={`text-[11px] ${active ? 'text-white' : 'text-label'}`}>{p.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function ControlPanel({
  open,
  isDesktop,
  onClose,
  settings,
  update,
  updateBack,
  onResetSettings,
  frontImageProps,
  backImageProps,
}) {
  const needsBackImage = settings.backMode !== 'pattern';
  const hasBackImage = Boolean(backImageProps.image);
  const desktopMotion = {
    initial: { x: 40, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 40, opacity: 0 },
  };
  const mobileMotion = {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* No scrim on mobile: the card above the sheet stays interactive */}
          <motion.aside
            key="panel"
            aria-label="Personalizza carta"
            {...(isDesktop ? desktopMotion : mobileMotion)}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            drag={isDesktop ? false : 'y'}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
            className={`fixed z-40 flex flex-col bg-panel shadow-[0_20px_60px_rgb(0_0_0/0.55)] ring-1 ring-white/10 backdrop-blur-2xl backdrop-saturate-150 ${
              isDesktop
                ? 'top-4 right-4 bottom-4 w-[360px] rounded-[28px]'
                : 'inset-x-0 bottom-0 h-[60dvh] rounded-t-[28px] pb-[env(safe-area-inset-bottom)]'
            }`}
          >
            {!isDesktop && (
              <div className="flex justify-center pt-2.5" aria-hidden>
                <span className="h-1.5 w-10 rounded-full bg-white/25" />
              </div>
            )}

            <header
              className={`flex items-center justify-between px-5 pt-4 pb-3 ${
                isDesktop ? '' : 'mx-auto w-full max-w-xl'
              }`}
            >
              <h2 className="text-[19px] font-semibold tracking-tight">Personalizza</h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={onResetSettings}
                  className="rounded-full px-3 py-1.5 text-[13px] text-accent outline-none hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Ripristina
                </button>
                <button
                  type="button"
                  aria-label="Chiudi pannello"
                  onClick={onClose}
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.08] text-white/70 outline-none hover:bg-white/[0.14] focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <CloseIcon width={16} height={16} />
                </button>
              </div>
            </header>

            <div
              className={`scrollbar-thin flex-1 space-y-6 overflow-y-auto px-4 pb-6 ${
                isDesktop ? '' : 'mx-auto w-full max-w-xl'
              }`}
              // Only the handle/header drags the sheet; the content keeps native scrolling
              onPointerDown={(e) => !isDesktop && e.stopPropagation()}
            >
              <Section title="Immagine fronte">
                <ImageDropzone {...frontImageProps} />
              </Section>

              <Section title="Effetto olografico">
                <Segmented
                  label="Stile olografico"
                  options={HOLO_STYLES}
                  value={settings.holoStyle}
                  onChange={(v) => update('holoStyle', v)}
                />
                <Slider label="Intensità holo" value={settings.intensity} onChange={(v) => update('intensity', v)} format={pct} />
                <Slider label="Glitter" value={settings.sparkle} onChange={(v) => update('sparkle', v)} format={pct} />
                <Slider label="Riflesso luce" value={settings.glare} onChange={(v) => update('glare', v)} format={pct} />
                <div className="space-y-2">
                  <span className="block px-0.5 text-[12px] text-label">Area foil</span>
                  <Segmented
                    label="Area foil"
                    options={FOIL_AREAS}
                    value={settings.foilArea}
                    onChange={(v) => update('foilArea', v)}
                  />
                </div>
              </Section>

              <Section title="Bordo">
                <Swatches
                  label="Colore cornice"
                  options={FRAMES}
                  value={settings.frame}
                  onChange={(v) => update('frame', v)}
                />
                <Slider
                  label="Spessore"
                  value={settings.border}
                  min={0}
                  max={7}
                  step={0.1}
                  onChange={(v) => update('border', v)}
                  format={(v) => v.toFixed(1)}
                />
                <Slider
                  label="Arrotondamento"
                  value={settings.radius}
                  min={0}
                  max={10}
                  step={0.1}
                  onChange={(v) => update('radius', v)}
                  format={(v) => v.toFixed(1)}
                />
              </Section>

              <Section title="Retro">
                <Segmented
                  label="Sfondo del retro"
                  options={BACK_MODES}
                  value={settings.backMode}
                  onChange={(v) => updateBack('backMode', v)}
                />

                {(!needsBackImage || !hasBackImage) && (
                  <>
                    <PatternPicker
                      value={settings.backPattern}
                      tint={settings.backTint}
                      onChange={(v) => updateBack('backPattern', v)}
                    />
                    <div className="space-y-2">
                      <span className="block px-0.5 text-[12px] text-label">Colore</span>
                      <div role="radiogroup" aria-label="Colore del retro" className="flex gap-2.5">
                        {BACK_TINTS.map((t) => {
                          const active = t.value === settings.backTint;
                          return (
                            <button
                              key={t.value}
                              type="button"
                              role="radio"
                              aria-checked={active}
                              aria-label={t.label}
                              title={t.label}
                              onClick={() => updateBack('backTint', t.value)}
                              className={`h-8 w-8 rounded-full outline-none transition-all focus-visible:ring-2 focus-visible:ring-accent ${
                                active
                                  ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1c1c20]'
                                  : 'ring-1 ring-white/15 hover:ring-white/40'
                              }`}
                              style={{ background: t.swatch }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {needsBackImage && (
                  <>
                    <ImageDropzone
                      {...backImageProps}
                      emptyLabel={settings.backMode === 'tile' ? 'Carica immagine per il motivo' : 'Carica immagine'}
                      resetLabel="Rimuovi immagine"
                    />
                    {!hasBackImage && (
                      <p className="px-1 text-[12px] leading-snug text-label">
                        Finché non carichi un’immagine, il retro usa il pattern qui sopra.
                      </p>
                    )}
                    {hasBackImage && settings.backMode === 'tile' && (
                      <Slider
                        label="Dimensione motivo"
                        value={settings.backTileSize}
                        min={8}
                        max={100}
                        step={1}
                        onChange={(v) => updateBack('backTileSize', v)}
                        format={(v) => `${Math.round(v)}%`}
                      />
                    )}
                    {hasBackImage && (
                      <Slider
                        label="Oscura dietro al testo"
                        value={settings.backDim}
                        min={0}
                        max={0.9}
                        onChange={(v) => updateBack('backDim', v)}
                        format={pct}
                      />
                    )}
                  </>
                )}

                <div className="space-y-2">
                  <span className="block px-0.5 text-[12px] text-label">Emblema</span>
                  <Segmented
                    label="Mostra emblema"
                    options={YES_NO}
                    value={settings.backEmblem}
                    onChange={(v) => updateBack('backEmblem', v)}
                  />
                </div>
                <TextField
                  label="Titolo"
                  value={settings.backTitle}
                  maxLength={24}
                  onChange={(v) => updateBack('backTitle', v)}
                />
                <TextField
                  label="Sottotitolo"
                  value={settings.backSubtitle}
                  maxLength={32}
                  onChange={(v) => updateBack('backSubtitle', v)}
                />
              </Section>

              <Section title="Movimento">
                <Slider
                  label="Inclinazione massima"
                  value={settings.tilt}
                  min={0}
                  max={30}
                  step={1}
                  onChange={(v) => update('tilt', v)}
                  format={(v) => `${v}°`}
                />
              </Section>

              <Section title="Testi fronte">
                <TextField label="Nome" value={settings.name} maxLength={28} onChange={(v) => update('name', v)} />
                <TextField label="Tipo" value={settings.subtitle} maxLength={14} onChange={(v) => update('subtitle', v)} />
                <TextField
                  label="Descrizione"
                  multiline
                  maxLength={180}
                  value={settings.description}
                  onChange={(v) => update('description', v)}
                />
                <TextField label="Numero di serie" value={settings.number} maxLength={22} onChange={(v) => update('number', v)} />
              </Section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
