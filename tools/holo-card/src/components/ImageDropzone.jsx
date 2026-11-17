import { useState } from 'react';
import { ImageIcon, ResetIcon } from './icons';

/**
 * Upload target with thumbnail. `image` may be null (nothing uploaded yet).
 * `resetLabel` is shown when `canReset` is true.
 */
export default function ImageDropzone({
  image,
  canReset,
  onPick,
  onFiles,
  onReset,
  error,
  busy = false,
  hint = 'PNG, JPG, WebP',
  emptyLabel = 'Carica immagine',
  replaceLabel = 'Sostituisci immagine',
  resetLabel = 'Usa immagine di esempio',
}) {
  const [over, setOver] = useState(false);

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOver(false);
    const files = [...(e.dataTransfer.files ?? [])];
    if (files.length) onFiles(files);
  };

  return (
    <div className="space-y-2.5">
      <button
        type="button"
        onClick={onPick}
        disabled={busy}
        aria-busy={busy}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={`group relative flex w-full items-center gap-3.5 rounded-xl p-2.5 text-left outline-none transition-all focus-visible:ring-2 focus-visible:ring-accent ${
          over
            ? 'border border-accent bg-accent/15'
            : 'border border-dashed border-white/15 bg-white/[0.05] hover:bg-white/[0.08]'
        }`}
      >
        <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-black text-white/40 ring-1 ring-white/10">
          {image ? (
            <img src={image} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon width={22} height={22} />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-[14px] font-medium text-white">
            <ImageIcon width={16} height={16} />
            {canReset ? replaceLabel : emptyLabel}
          </span>
          <span className="mt-0.5 block text-[12px] leading-snug text-label">
            {busy ? 'Lettura del file…' : `Trascina qui o tocca per scegliere · ${hint}`}
          </span>
        </span>
      </button>

      {error && (
        <p role="alert" className="px-1 text-[12px] text-[#ff6961]">
          {error}
        </p>
      )}

      {canReset && (
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-1 text-[13px] text-accent outline-none hover:underline focus-visible:underline"
        >
          <ResetIcon width={14} height={14} />
          {resetLabel}
        </button>
      )}
    </div>
  );
}
