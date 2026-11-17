import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, useMotionValue, useSpring, useTransform } from 'framer-motion';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

// Spring presets: tilt is snappy, light lags a touch behind (feels like a real
// reflection), flip is heavier so a full turn has some weight to it.
const TILT_SPRING = { stiffness: 170, damping: 19, mass: 0.7 };
const LIGHT_SPRING = { stiffness: 120, damping: 20, mass: 0.6 };
const ACTIVE_SPRING = { stiffness: 90, damping: 22 };
const FLIP_SPRING = { stiffness: 70, damping: 14, mass: 1 };

const DRAG_THRESHOLD = 8; // px before a press becomes a flip-drag
const FLIP_COMMIT = 55; // degrees of drag needed to commit a flip

/**
 * Drives the card entirely through motion values: pointer movement never
 * triggers a React render, so the whole interaction stays on the 60fps path.
 *
 * Exposed CSS variables (numbers, consumed by holo.css):
 *   --px / --py   pointer position on the card, 0..1
 *   --rx / --ry   current tilt in degrees
 *   --hyp         distance of pointer from center, 0..1
 *   --active      0 at rest, 1 while interacting
 */
export function useCardPhysics({ maxTilt = 14, intro = true } = {}) {
  const stageRef = useRef(null);
  const rectRef = useRef(null);
  const dragRef = useRef(null);
  const flipBase = useRef(0);
  const introRef = useRef([]);
  const maxTiltRef = useRef(maxTilt);
  maxTiltRef.current = maxTilt;
  const [isFlipped, setIsFlipped] = useState(false);

  // Raw targets
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const ptrX = useMotionValue(0.5);
  const ptrY = useMotionValue(0.5);
  const activeT = useMotionValue(0);
  const flipT = useMotionValue(0);

  // Sprung values
  const rx = useSpring(rotX, TILT_SPRING);
  const ry = useSpring(rotY, TILT_SPRING);
  const px = useSpring(ptrX, LIGHT_SPRING);
  const py = useSpring(ptrY, LIGHT_SPRING);
  const active = useSpring(activeT, ACTIVE_SPRING);
  const flip = useSpring(flipT, FLIP_SPRING);

  const hyp = useTransform(() =>
    clamp(Math.hypot(px.get() - 0.5, py.get() - 0.5) / 0.5, 0, 1),
  );
  const scale = useTransform(active, [0, 1], [1, 1.04]);

  const stopIntro = () => {
    introRef.current.forEach((c) => c.stop());
    introRef.current = [];
  };

  const measure = () => {
    if (stageRef.current) rectRef.current = stageRef.current.getBoundingClientRect();
    return rectRef.current;
  };

  const reset = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
    ptrX.set(0.5);
    ptrY.set(0.5);
    activeT.set(0);
  }, [rotX, rotY, ptrX, ptrY, activeT]);

  const setFlipBase = useCallback(
    (deg) => {
      flipBase.current = deg;
      flipT.set(deg);
      setIsFlipped(Math.abs(Math.round(deg / 180)) % 2 === 1);
    },
    [flipT],
  );

  const flipCard = useCallback(
    (dir = 1) => setFlipBase(flipBase.current + 180 * dir),
    [setFlipBase],
  );

  const track = (e) => {
    const r = rectRef.current ?? measure();
    if (!r) return null;
    const x = clamp((e.clientX - r.left) / r.width, 0, 1);
    const y = clamp((e.clientY - r.top) / r.height, 0, 1);
    const t = maxTiltRef.current;
    ptrX.set(x);
    ptrY.set(y);
    // The card turns to "face" the pointer.
    rotY.set((x - 0.5) * 2 * t);
    rotX.set(-(y - 0.5) * 2 * t);
    activeT.set(1);
    return r;
  };

  const onPointerEnter = () => {
    stopIntro();
    measure();
  };

  const onPointerMove = (e) => {
    const r = track(e);
    const d = dragRef.current;
    if (!r || !d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    if (!d.dragging && Math.abs(dx) > DRAG_THRESHOLD) d.dragging = true;
    if (d.dragging) {
      // Map horizontal drag to rotation: a full card-width ≈ 180°.
      flipT.set(flipBase.current + clamp((dx / r.width) * 180, -180, 180));
    }
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    stopIntro();
    measure();
    dragRef.current = { id: e.pointerId, startX: e.clientX, dragging: false };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    track(e);
  };

  const endDrag = (e) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    dragRef.current = null;
    if (!d.dragging) return;
    const offset = flipT.get() - flipBase.current;
    if (Math.abs(offset) > FLIP_COMMIT) setFlipBase(flipBase.current + Math.sign(offset) * 180);
    else flipT.set(flipBase.current);
  };

  const onPointerUp = (e) => {
    endDrag(e);
    const r = rectRef.current;
    const outside =
      !r || e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    // Touch has no hover: let go → card settles. Mouse settles only if it left.
    if (e.pointerType !== 'mouse' || outside) reset();
  };

  const onPointerLeave = () => {
    if (!dragRef.current) reset();
  };

  const onPointerCancel = (e) => {
    endDrag(e);
    reset();
  };

  // Keep the cached rect honest when the layout changes.
  useEffect(() => {
    const onResize = () => (rectRef.current = null);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize, true);
    };
  }, []);

  // A short "showcase" sweep on load so the foil is visible immediately.
  useEffect(() => {
    if (!intro) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const opts = { duration: 2.4, ease: 'easeInOut', delay: 0.5 };
    const t = maxTiltRef.current;
    introRef.current = [
      animate(ptrX, [0.5, 0.15, 0.85, 0.5], opts),
      animate(ptrY, [0.5, 0.3, 0.7, 0.5], opts),
      animate(rotY, [0, -t * 0.7, t * 0.7, 0], opts),
      animate(rotX, [0, t * 0.4, -t * 0.4, 0], opts),
      animate(activeT, [0, 1, 1, 0], opts),
    ];
    return stopIntro;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    stageRef,
    isFlipped,
    flipCard,
    handlers: {
      onPointerEnter,
      onPointerMove,
      onPointerDown,
      onPointerUp,
      onPointerLeave,
      onPointerCancel,
    },
    values: { rx, ry, px, py, hyp, active, flip, scale },
  };
}
