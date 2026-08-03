/* ============================================================
   Reveal — wraps content and fades it in on scroll.
   ============================================================ */

import { memo } from 'react';
import type { ElementType, ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Delay in milliseconds (staggered groups) */
  delay?: number;
}

export const Reveal = memo(function Reveal({
  children,
  className = '',
  as: Tag = 'div',
  delay = 0,
}: RevealProps) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={['reveal', className].filter(Boolean).join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
});
