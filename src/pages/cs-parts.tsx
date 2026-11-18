import React from 'react';
import type { Shot } from '../data/projects';

/** Pieces shared by the case study page and the project-specific sections */

export const reveal = (i = 0) => ({ 'data-reveal': '', style: { '--i': i } as React.CSSProperties });

export const Row: React.FC<{ title: string; id: string; children: React.ReactNode; wide?: boolean }> = ({ title, id, children, wide }) => (
  <section className={`cs-row ${wide ? 'cs-row--wide' : ''}`} aria-labelledby={id}>
    <h2 id={id} className="cs-row-title" {...reveal(0)}>{title}</h2>
    <div className="cs-row-body" {...reveal(1)}>{children}</div>
  </section>
);

export const Picture: React.FC<{ shot: Shot; lang: 'it' | 'en'; eager?: boolean }> = ({ shot, lang, eager }) => (
  <img
    src={shot.src}
    alt={shot.alt[lang]}
    width={shot.w}
    height={shot.h}
    loading={eager ? 'eager' : 'lazy'}
    decoding="async"
    className={`shot shot--${shot.kind}`}
  />
);
