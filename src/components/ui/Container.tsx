/* ============================================================
   Container — centered, padded layout wrapper.
   ============================================================ */

import { memo } from 'react';
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Removes the max-width constraint */
  fluid?: boolean;
  as?: 'div' | 'section' | 'header' | 'footer';
}

export const Container = memo(function Container({
  children,
  className = '',
  fluid = false,
  as: Tag = 'div',
}: ContainerProps) {
  const classNames = ['container', fluid && 'container--fluid', className]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classNames}>{children}</Tag>;
});
