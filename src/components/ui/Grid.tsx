/* ============================================================
   Grid — responsive layout grid built on CSS grid.
   ============================================================ */

import { memo } from 'react';

interface GridProps {
  children: React.ReactNode;
  /** Number of columns; "auto" lets cards size naturally */
  cols?: 2 | 3 | 4 | 'auto';
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
  as?: 'div' | 'ul' | 'ol';
}

export const Grid = memo(function Grid({
  children,
  cols = 3,
  className = '',
  gap = 'md',
  as: Tag = 'div',
}: GridProps) {
  const classes = ['grid', `grid--${cols}`, `grid--gap-${gap}`, className]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes}>{children}</Tag>;
});
