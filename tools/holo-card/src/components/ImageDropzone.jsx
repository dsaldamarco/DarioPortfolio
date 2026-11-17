import { useState } from 'react';
import { ImageIcon, ResetIcon } from './icons';

export default function ImageDropzone({ image, isDefault, onPick, onFile, onReset, error }) {
  const [over, setOver] = useState(false);

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div className="space-y-2.5">
      <button
        type="button"
        onClick={onPick}
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
        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-black ring-1 ring-white/10">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-[14px] font-medium text-white">
            <ImageIcon width={16} height={16} />
            {isDefault ? 'Carica immagine' : 'Sostituisci immagine'}
          </span>
          <span className="mt-0.5 block text-[12px] leading-snug text-label">
            Trascina qui o tocca per scegliere · PNG, JPG, WebP
          </span>
        </span>
      </button>

      {error && (
        <p role="alert" className="px-1 text-[12px] text-[#ff6961]">
          {error}
        </p>
      )}

      {!isDefault && (
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-1 text-[13px] text-accent outline-none hover:underline focus-visible:underline"
        >
          <ResetIcon width={14} height={14} />
          Usa immagine di esempio
        </button>
      )}
    </div>
  );
}
