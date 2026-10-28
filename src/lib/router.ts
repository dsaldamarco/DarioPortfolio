import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const EVENT = 'app:navigate';

export function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener('popstate', update);
    window.addEventListener(EVENT, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(EVENT, update);
    };
  }, []);
  return path;
}

type DocWithTransition = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

/**
 * Client-side navigation. When `launchFrom` is given, that element gets the
 * shared view-transition name so the icon grows into the case study header.
 */
export function navigate(to: string, launchFrom?: HTMLElement | null) {
  const [pathname, hash] = to.split('#');
  const go = () => {
    flushSync(() => {
      window.history.pushState({}, '', to);
      window.dispatchEvent(new Event(EVENT));
    });
    if (hash) {
      document.getElementById(hash)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  };

  const doc = document as DocWithTransition;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!doc.startViewTransition || reduce || pathname === window.location.pathname) {
    go();
    return;
  }
  if (launchFrom) launchFrom.style.viewTransitionName = 'launch-icon';
  const transition = doc.startViewTransition(() => {
    if (launchFrom) launchFrom.style.viewTransitionName = '';
    go();
  });
  transition.finished.finally(() => {
    if (launchFrom) launchFrom.style.viewTransitionName = '';
  });
}

/** Internal link click: keep new-tab and modified clicks native. */
export function onLinkClick(e: React.MouseEvent<HTMLAnchorElement>, launchFrom?: HTMLElement | null) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  navigate(e.currentTarget.getAttribute('href') ?? '/', launchFrom);
}
