/* ============================================================
   ScrollProgress — reading-progress bar pinned to the top,
   driven by scroll position (motion spring).
   ============================================================ */

import { memo } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress = memo(function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
});
