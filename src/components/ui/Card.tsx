/* ============================================================
   Card — generic surface wrapper used across the site.
   ============================================================ */

import { memo } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
  hoverable?: boolean;
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = memo(function Card({
  children,
  className = '',
  as: Tag = 'div',
  hoverable = false,
  interactive = false,
  padding = 'md',
}: CardProps) {
  const classes = [
    'card',
    hoverable && 'card--hoverable',
    interactive && 'card--interactive',
    `card--pad-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes}>{children}</Tag>;
});
