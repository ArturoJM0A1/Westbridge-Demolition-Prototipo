/* ============================================================
   Parallax — subtle scroll-linked vertical drift for media.
   Disabled entirely when the user prefers reduced motion.
   ============================================================ */

import { memo, useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Travel distance as a fraction of the element height, e.g. 0.15 */
  speed?: number;
}

export const Parallax = memo(function Parallax({
  children,
  className = '',
  speed = 0.15,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const travel = `${speed * 100}%`;
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}`, travel]);

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
});
