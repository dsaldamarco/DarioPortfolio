import { AnimatePresence, motion } from 'framer-motion';
import ImageDropzone from './ImageDropzone';
import { Section, Segmented, Slider, Swatches, TextField } from './ui';
import { CloseIcon } from './icons';
import { FOIL_AREAS, FRAMES, HOLO_STYLES } from '../settings';

const pct = (v) => `${Math.round(v * 100)}%`;

export default function ControlPanel({
  open,
  isDesktop,
  onClose,
  settings,
  update,
  onResetSettings,
  imageProps,
}) {
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

            <header className="flex items-center justify-between px-5 pt-4 pb-3">
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
              className="scrollbar-thin flex-1 space-y-6 overflow-y-auto px-4 pb-6"
              // Only the handle/header drags the sheet; the content keeps native scrolling
              onPointerDown={(e) => !isDesktop && e.stopPropagation()}
            >
              <Section title="Immagine">
                <ImageDropzone {...imageProps} />
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

              <Section title="Testi">
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
