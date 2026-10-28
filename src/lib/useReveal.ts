import { useEffect } from 'react';

/**
 * Arms the entrance for every [data-reveal] element under the document and
 * reveals each once as it enters the viewport. Content stays visible when
 * this never runs, because the hidden state only applies under `.js`.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const root = document.documentElement;
    if (!('IntersectionObserver' in window)) return;
    root.classList.add('js');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
    );

    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
