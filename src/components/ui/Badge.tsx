/* ============================================================
   Badge — small label / tag / status indicator.
   ============================================================ */

import { memo } from 'react';

type BadgeTone = 'accent' | 'neutral' | 'dark' | 'light';

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export const Badge = memo(function Badge({ children, tone = 'accent', className = '' }: BadgeProps) {
  return (
    <span className={['badge', `badge--${tone}`, className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
});
