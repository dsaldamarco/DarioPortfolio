import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HoloCard from './components/HoloCard';
import ControlPanel from './components/ControlPanel';
import ExportDialog from './components/ExportDialog';
import { IconButton } from './components/ui';
import { DownloadIcon, FlipIcon, SlidersIcon, UploadIcon } from './components/icons';
import { useMediaQuery } from './hooks/useMediaQuery';
import { ACCEPTED_TYPES, DEFAULT_IMAGE, DEFAULT_SETTINGS, MAX_FILE_MB } from './settings';

const AMBIENT = {
  rainbow: ['#ff5f9e', '#5cc8ff'],
  galaxy: ['#8a5cff', '#2bd4ff'],
  gold: ['#ffb84d', '#ff7a45'],
  prism: ['#5cffb0', '#a77bff'],
};

export default function App() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [image, setImage] = useState(DEFAULT_IMAGE);
  const [backImage, setBackImage] = useState(null);
  const [errors, setErrors] = useState({ front: '', back: '' });
  const [panelOpen, setPanelOpen] = useState(isDesktop);
  const [flipped, setFlipped] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const exportOpenRef = useRef(false);
  exportOpenRef.current = exportOpen;
  const cardRef = useRef(null);
  const inputRef = useRef(null);
  const pickTarget = useRef('front');
  const dragDepth = useRef(0);
  const flippedRef = useRef(false);
  flippedRef.current = flipped;

  useEffect(() => setPanelOpen(isDesktop), [isDesktop]);
  const update = useCallback((key, value) => setSettings((s) => ({ ...s, [key]: value })), []);

  // Editing the back turns the card around so you see what you change.
  const updateBack = useCallback(
    (key, value) => {
      update(key, value);
      cardRef.current?.showSide('back');
    },
    [update],
  );

  // ---------- Image handling (front and back) ----------
  const swap = (setter, next) =>
    setter((prev) => {
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev);
      return next;
    });

  const loadFile = useCallback((file, target = 'front') => {
    if (!file) return;
    const fail = (msg) => setErrors((e) => ({ ...e, [target]: msg }));
    if (!ACCEPTED_TYPES.includes(file.type)) return fail('Formato non supportato. Usa PNG, JPG, WebP, GIF o SVG.');
    if (file.size > MAX_FILE_MB * 1024 * 1024) return fail(`L’immagine supera i ${MAX_FILE_MB} MB.`);
    setErrors((e) => ({ ...e, [target]: '' }));
    const url = URL.createObjectURL(file);
    if (target === 'back') {
      swap(setBackImage, url);
      // An uploaded back image implies image mode, unless you chose the tile mode.
      setSettings((s) => (s.backMode === 'pattern' ? { ...s, backMode: 'image' } : s));
      cardRef.current?.showSide('back');
    } else {
      swap(setImage, url);
      cardRef.current?.showSide('front');
    }
  }, []);

  /** Drops, pastes and the top upload button go to the face you're looking at. */
  const visibleFace = () => (flippedRef.current ? 'back' : 'front');

  const pickFile = (target) => {
    pickTarget.current = target ?? visibleFace();
    inputRef.current?.click();
  };

  // Whole-window drag & drop
  useEffect(() => {
    const hasFiles = (e) => [...(e.dataTransfer?.types ?? [])].includes('Files');
    const onEnter = (e) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      dragDepth.current += 1;
      setDragging(true);
    };
    const onOver = (e) => hasFiles(e) && e.preventDefault();
    const onLeave = () => {
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) setDragging(false);
    };
    const onDrop = (e) => {
      e.preventDefault();
      dragDepth.current = 0;
      setDragging(false);
      loadFile(e.dataTransfer?.files?.[0], visibleFace());
    };
    window.addEventListener('dragenter', onEnter);
    window.addEventListener('dragover', onOver);
    window.addEventListener('dragleave', onLeave);
    window.addEventListener('drop', onDrop);
    return () => {
      window.removeEventListener('dragenter', onEnter);
      window.removeEventListener('dragover', onOver);
      window.removeEventListener('dragleave', onLeave);
      window.removeEventListener('drop', onDrop);
    };
  }, [loadFile]);

  // Paste an image from the clipboard
  useEffect(() => {
    const onPaste = (e) => {
      const item = [...(e.clipboardData?.items ?? [])].find((i) => i.type.startsWith('image/'));
      if (item) loadFile(item.getAsFile(), visibleFace());
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [loadFile]);

  // Keyboard: F = flip
  useEffect(() => {
    const onKey = (e) => {
      if (exportOpenRef.current || e.target.closest?.('input, textarea, [contenteditable]')) return;
      if (e.key === 'f' || e.key === 'F') cardRef.current?.flip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const [c1, c2] = AMBIENT[settings.holoStyle];
  const shiftForPanel = panelOpen && isDesktop;
  const sheetOpen = panelOpen && !isDesktop;

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-ink select-none">
      {/* Ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-[18%] left-[22%] h-[46vmax] w-[46vmax] rounded-full opacity-25 blur-[120px]"
          animate={{ backgroundColor: c1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          className="absolute right-[18%] bottom-[8%] h-[40vmax] w-[40vmax] rounded-full opacity-20 blur-[120px]"
          animate={{ backgroundColor: c2 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(0_0_0/0.65)_100%)]" />
      </div>

      {/* Top bar */}
      <header
        className={`absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] transition-[padding] duration-500 sm:px-6 ${
          shiftForPanel ? 'lg:pr-[396px]' : ''
        }`}
      >
        <div className="flex items-center gap-2.5">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="h-7 w-7" />
          <div className="leading-tight">
            <h1 className="text-[15px] font-semibold tracking-tight">Holo Studio</h1>
            <p className="hidden text-[12px] text-label sm:block">Carta collezionabile olografica</p>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          <IconButton
            label={flipped ? 'Carica immagine per il retro' : 'Carica immagine'}
            onClick={() => pickFile()}
          >
            <UploadIcon />
          </IconButton>
          <IconButton
            label="Salva foto o GIF"
            onClick={() => {
              if (!isDesktop) setPanelOpen(false); // the sheet would cover the preview
              setExportOpen(true);
            }}
          >
            <DownloadIcon />
          </IconButton>
          <IconButton label={flipped ? 'Mostra fronte' : 'Gira carta'} onClick={() => cardRef.current?.flip()}>
            <FlipIcon />
          </IconButton>
          {!panelOpen && (
            <IconButton label="Personalizza" onClick={() => setPanelOpen(true)}>
              <SlidersIcon />
            </IconButton>
          )}
        </nav>
      </header>

      {/* Stage */}
      <motion.main
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          paddingRight: shiftForPanel ? 376 : 0,
          // Fit the card into the space left above the sheet / save dialog.
          // The save dialog shrinks the card via --card-w (layout), never via
          // scale: the exporter can't capture a visually scaled element.
          y: exportOpen ? -190 : sheetOpen ? '-28dvh' : 0,
          scale: sheetOpen && !exportOpen ? 0.46 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 32 }}
        style={{
          '--card-w': exportOpen
            ? 'max(150px, min(70vw, calc((100dvh - 500px) * 0.716), 340px))'
            : 'min(80vw, calc((100dvh - 190px) * 0.716), 400px)',
        }}
      >
        <HoloCard
          ref={cardRef}
          image={image}
          backImage={backImage}
          settings={settings}
          onFlipChange={setFlipped}
        />
      </motion.main>

      {/* Hint */}
      <motion.p
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center text-[12px] text-white/40 transition-[padding] duration-500 ${
          shiftForPanel ? 'lg:pr-[396px]' : ''
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: sheetOpen ? 0 : 1 }}
        transition={{ delay: 0.6 }}
      >
        <span className="hidden sm:inline">Muovi il cursore sulla carta · Trascina in orizzontale per girarla · Premi F</span>
        <span className="sm:hidden">Tocca e muovi il dito · Trascina in orizzontale per girarla</span>
      </motion.p>

      <ControlPanel
        open={panelOpen}
        isDesktop={isDesktop}
        onClose={() => setPanelOpen(false)}
        settings={settings}
        update={update}
        updateBack={updateBack}
        onResetSettings={() => setSettings(DEFAULT_SETTINGS)}
        frontImageProps={{
          image,
          canReset: image !== DEFAULT_IMAGE,
          onPick: () => pickFile('front'),
          onFile: (f) => loadFile(f, 'front'),
          onReset: () => swap(setImage, DEFAULT_IMAGE),
          error: errors.front,
        }}
        backImageProps={{
          image: backImage,
          canReset: Boolean(backImage),
          onPick: () => pickFile('back'),
          onFile: (f) => loadFile(f, 'back'),
          onReset: () => swap(setBackImage, null),
          error: errors.back,
        }}
      />

      <ExportDialog
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        cardRef={cardRef}
        cardName={settings.name}
        flipped={flipped}
      />

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        className="hidden"
        onChange={(e) => {
          loadFile(e.target.files?.[0], pickTarget.current);
          e.target.value = '';
        }}
      />

      {/* Global drop overlay */}
      <AnimatePresence>
        {dragging && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-black/55 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center gap-3 rounded-[28px] border-2 border-dashed border-white/30 px-12 py-10 text-center"
            >
              <UploadIcon width={32} height={32} />
              <p className="text-[17px] font-semibold">
                {flipped ? 'Rilascia per applicarla al retro' : 'Rilascia per applicare l’immagine'}
              </p>
              <p className="text-[13px] text-label">PNG, JPG, WebP, GIF o SVG</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
