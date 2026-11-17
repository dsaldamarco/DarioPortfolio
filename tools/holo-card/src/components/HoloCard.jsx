import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCardPhysics } from '../hooks/useCardPhysics';
import CardFront from './CardFront';
import CardBack from './CardBack';

/**
 * Layer stack:
 *   .card-stage   static box: receives pointer events, owns perspective + CSS vars
 *     .card-shadow  flat, follows tilt (outside the 3D context → cheap)
 *     .card-tilt    rotateX/rotateY from the pointer (spring)
 *       .card-flip  rotateY 0/180/… from button or horizontal drag (spring)
 *         .card-face.card-front   art + holo + glare
 *         .card-face.card-back
 */
const HoloCard = forwardRef(function HoloCard({ image, backImage, settings, onFlipChange }, ref) {
  const { stageRef, handlers, values, flipCard, showSide, setPose, sideAngles, lock, isFlipped } =
    useCardPhysics({ maxTilt: settings.tilt });
  const { rx, ry, px, py, hyp, active, flip, scale } = values;
  const captureRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      flip: flipCard,
      showSide,
      setPose,
      sideAngles,
      lock,
      captureNode: () => captureRef.current,
    }),
    [flipCard, showSide, setPose, sideAngles, lock],
  );
  useEffect(() => onFlipChange?.(isFlipped), [isFlipped, onFlipChange]);

  return (
    // Export target: padded so the tilted card and its shadow fit, with
    // matching negative margins so it doesn't change the layout.
    <div ref={captureRef} className="card-capture">
    <motion.div
      ref={stageRef}
      className="card-stage"
      data-holo={settings.holoStyle}
      data-foil={settings.foilArea}
      data-frame={settings.frame}
      role="img"
      aria-label={`Carta olografica: ${settings.name}. ${isFlipped ? 'Retro' : 'Fronte'} visibile.`}
      style={{
        '--px': px,
        '--py': py,
        '--rx': rx,
        '--ry': ry,
        '--hyp': hyp,
        '--active': active,
        '--intensity': settings.intensity,
        '--glare': settings.glare,
        '--sparkle': settings.sparkle,
        '--border': `${settings.border}cqw`,
        '--radius': `${settings.radius}cqw`,
      }}
      {...handlers}
    >
      <div className="card-shadow" aria-hidden />
      <motion.div className="card-tilt" style={{ rotateX: rx, rotateY: ry, scale }}>
        <motion.div className="card-flip" style={{ rotateY: flip }}>
          <div className="card-face card-front">
            <CardFront image={image} settings={settings} />
          </div>
          <div className="card-face card-back">
            <CardBack settings={settings} image={backImage} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
    </div>
  );
});

export default HoloCard;
