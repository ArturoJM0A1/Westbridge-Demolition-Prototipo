/* ============================================================
   IconTile — icon in a branded square (used on cards/features).
   ============================================================ */

import { memo } from 'react';
import { Icon, type IconName } from '@/components/ui/Icon';

interface IconTileProps {
  icon: IconName;
  tone?: 'accent' | 'dark' | 'light';
  size?: number;
  className?: string;
}

export const IconTile = memo(function IconTile({
  icon,
  tone = 'dark',
  size = 26,
  className = '',
}: IconTileProps) {
  return (
    <span className={['icon-tile', `icon-tile--${tone}`, className].filter(Boolean).join(' ')}>
      <Icon name={icon} size={size} />
    </span>
  );
});
