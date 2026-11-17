import { useId } from 'react';
import { Segmented } from './ui';
import { EyeIcon, EyeOffIcon } from './icons';

export const DEPTH_MIN = -40;
export const DEPTH_MAX = 40;

const AREAS = [
  { value: 'art', label: 'Illustrazione' },
  { value: 'card', label: 'Carta intera' },
];

const fmtDepth = (v) => `${v > 0 ? '+' : ''}${v} px`;

function Chip({ on, onClick, children, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={`rounded-full px-2.5 py-1 text-[12px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent ${
        on ? 'bg-white text-black' : 'bg-white/[0.07] text-white/65 hover:bg-white/[0.12] hover:text-white/85'
      }`}
    >
      {children}
    </button>
  );
}

function LayerRow({ layer, onChange }) {
  const id = useId();
  const pct = ((layer.depth - DEPTH_MIN) / (DEPTH_MAX - DEPTH_MIN)) * 100;
  return (
    <li
      className={`rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-hairline transition-opacity ${
        layer.visible ? '' : 'opacity-55'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          aria-pressed={layer.visible}
          aria-label={layer.visible ? `Nascondi ${layer.name}` : `Mostra ${layer.name}`}
          title={layer.visible ? 'Nascondi' : 'Mostra'}
          onClick={() => onChange({ visible: !layer.visible })}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/80 outline-none hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-accent"
        >
          {layer.visible ? <EyeIcon width={17} height={17} /> : <EyeOffIcon width={17} height={17} />}
        </button>
        <span className="checker grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-md ring-1 ring-white/10">
          <img src={layer.src} alt="" className="max-h-full max-w-full object-contain" draggable={false} />
        </span>
        <label htmlFor={id} className="min-w-0 flex-1 truncate text-[13px] text-white/90" title={layer.name}>
          {layer.name}
        </label>
        <span className="shrink-0 tabular-nums text-[12px] text-label">{fmtDepth(layer.depth)}</span>
      </div>

      <input
        id={id}
        type="range"
        className="range range-bipolar mt-1"
        min={DEPTH_MIN}
        max={DEPTH_MAX}
        step={1}
        value={layer.depth}
        aria-valuetext={fmtDepth(layer.depth)}
        style={{ '--val': `${pct}%` }}
        onChange={(e) => onChange({ depth: parseInt(e.target.value, 10) })}
        onDoubleClick={() => onChange({ depth: 0 })}
        title="Profondità · doppio clic per azzerare"
      />

      <div className="flex flex-wrap gap-1.5">
        <Chip on={layer.shadow} label={`Ombra per ${layer.name}`} onClick={() => onChange({ shadow: !layer.shadow })}>
          Ombra
        </Chip>
        <Chip on={layer.above} label={`${layer.name} sopra l’effetto holo`} onClick={() => onChange({ above: !layer.above })}>
          Sopra holo
        </Chip>
      </div>
    </li>
  );
}

/**
 * Layer list, top of the stack first (like Photoshop / Procreate).
 */
export default function LayersPanel({ art, onLayerChange, onArtChange, onAutoDepth, onResetDepth }) {
  const count = art.layers.length;
  const isDoc = art.kind === 'layers';
  return (
    <div className="space-y-3">
      <p className="px-0.5 text-[12px] leading-snug text-label">
        {isDoc
          ? `${art.source} · ${count} ${count === 1 ? 'livello' : 'livelli'}`
          : 'Immagine singola: un livello a profondità 0. Carica un PSD, un file Procreate o più immagini per separare i piani.'}
      </p>
      {art.note && (
        <p role="status" className="rounded-lg bg-[#ffd60a]/10 px-2.5 py-2 text-[12px] leading-snug text-[#ffd60a]">
          {art.note}
        </p>
      )}

      {isDoc && (
        <div className="space-y-2">
          <span className="block px-0.5 text-[12px] text-label">I livelli coprono</span>
          <Segmented
            label="Area dei livelli"
            options={AREAS}
            value={art.area}
            onChange={(v) => onArtChange({ area: v })}
          />
          {art.area === 'card' && (
            <p className="px-0.5 text-[12px] leading-snug text-label">
              Cornice e testi della carta sono nascosti: il file è la carta.
            </p>
          )}
        </div>
      )}

      {count > 1 && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onAutoDepth}
            className="flex-1 rounded-[10px] bg-white/[0.07] px-3 py-1.5 text-[13px] font-medium text-white/85 outline-none hover:bg-white/[0.12] focus-visible:ring-2 focus-visible:ring-accent"
          >
            Profondità automatica
          </button>
          <button
            type="button"
            onClick={onResetDepth}
            className="rounded-[10px] bg-white/[0.07] px-3 py-1.5 text-[13px] font-medium text-white/85 outline-none hover:bg-white/[0.12] focus-visible:ring-2 focus-visible:ring-accent"
          >
            Azzera
          </button>
        </div>
      )}

      <ul className="space-y-2" aria-label="Livelli, dal più in alto">
        {[...art.layers].reverse().map((l) => (
          <LayerRow key={l.id} layer={l} onChange={(patch) => onLayerChange(l.id, patch)} />
        ))}
      </ul>
    </div>
  );
}
