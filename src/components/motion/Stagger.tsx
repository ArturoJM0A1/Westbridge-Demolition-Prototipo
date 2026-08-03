/* ============================================================
   Stagger — container + items for sequenced scroll reveals.
   ============================================================ */

import { memo, type ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in ms before the sequence starts */
  delay?: number;
}

export const Stagger = memo(function Stagger({
  children,
  className = '',
  delay = 0,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px 0px -60px 0px' }}
      transition={delay ? { delayChildren: delay / 1000 } : undefined}
    >
      {children}
    </motion.div>
  );
});

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = memo(function StaggerItem({
  children,
  className = '',
}: StaggerItemProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
});
