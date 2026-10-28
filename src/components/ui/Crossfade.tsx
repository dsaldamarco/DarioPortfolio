import React, { useEffect, useRef, useState } from 'react';
import type { Shot } from '../../data/projects';

interface CrossfadeProps {
  shots: Shot[];
  lang: 'it' | 'en';
  className?: string;
  hold?: number;
}

/** Slow crossfade between screens of the same framing; pauses off-screen, hidden or under reduced motion. */
export const Crossfade: React.FC<CrossfadeProps> = ({ shots, lang, className = '', hold = 5600 }) => {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || shots.length < 2) return;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (ref.current) observer.observe(ref.current);
    const id = window.setInterval(() => {
      if (visible && document.visibilityState === 'visible') {
        setIndex((i) => (i + 1) % shots.length);
      }
    }, hold);
    return () => {
      observer.disconnect();
      window.clearInterval(id);
    };
  }, [shots.length, hold]);

  return (
    <div ref={ref} className={`crossfade ${className}`} style={{ aspectRatio: `${shots[0].w} / ${shots[0].h}` }}>
      {shots.map((shot, i) => (
        <img
          key={shot.src}
          src={shot.src}
          alt={i === index ? shot.alt[lang] : ''}
          aria-hidden={i !== index}
          width={shot.w}
          height={shot.h}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={`shot shot--${shot.kind} ${i === index ? 'is-on' : ''}`}
        />
      ))}
    </div>
  );
};
