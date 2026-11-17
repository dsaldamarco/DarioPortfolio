import { useId } from 'react';
import { motion } from 'framer-motion';

export function Section({ title, children, action }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-label">{title}</h3>
        {action}
      </div>
      <div className="rounded-2xl bg-white/[0.04] p-3.5 ring-1 ring-hairline space-y-4">{children}</div>
    </section>
  );
}

export function Slider({ label, value, min = 0, max = 1, step = 0.01, onChange, format }) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-[13px]">
        <label htmlFor={id} className="text-white/85">
          {label}
        </label>
        <span className="tabular-nums text-label">{format ? format(value) : value}</span>
      </div>
      <input
        id={id}
        type="range"
        className="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ '--val': `${pct}%` }}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}

/** iOS-style segmented control with a sliding thumb. */
export function Segmented({ options, value, onChange, label }) {
  const layoutId = useId();
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-[10px] bg-white/[0.07] p-0.5">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`relative flex-1 rounded-[8px] px-2 py-1.5 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent ${
              active ? 'text-white' : 'text-white/55 hover:text-white/80'
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-[8px] bg-white/[0.16] shadow-[0_2px_6px_rgb(0_0_0/0.3)]"
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Swatches({ options, value, onChange, label }) {
  return (
    <div role="radiogroup" aria-label={label} className="grid grid-cols-4 gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className="group flex flex-col items-center gap-1.5 outline-none"
          >
            <span
              className={`h-9 w-full rounded-xl transition-all duration-200 group-focus-visible:ring-2 group-focus-visible:ring-accent ${
                active
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1c1c20]'
                  : 'ring-1 ring-white/10 group-hover:ring-white/30'
              }`}
              style={{ background: o.swatch }}
            />
            <span className={`text-[11px] ${active ? 'text-white' : 'text-label'}`}>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function TextField({ label, value, onChange, multiline, maxLength }) {
  const id = useId();
  const cls =
    'w-full rounded-[10px] bg-white/[0.07] px-3 py-2 text-[14px] text-white placeholder:text-white/30 outline-none ring-1 ring-transparent transition focus:ring-accent/80 focus:bg-white/[0.1]';
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block px-0.5 text-[12px] text-label">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={3}
          maxLength={maxLength}
          className={`${cls} resize-none leading-snug`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          maxLength={maxLength}
          className={cls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

export function IconButton({ label, children, onClick, active, className = '' }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`grid h-10 w-10 place-items-center rounded-full outline-none backdrop-blur-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent active:scale-95 ${
        active
          ? 'bg-white text-black'
          : 'bg-white/[0.08] text-white/90 ring-1 ring-white/10 hover:bg-white/[0.14]'
      } ${className}`}
    >
      {children}
    </button>
  );
}
