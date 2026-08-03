/* ============================================================
   CheckList — bullet list with check icons.
   ============================================================ */

import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';

interface CheckListProps {
  items: string[];
  tone?: 'dark' | 'light';
  className?: string;
}

export const CheckList = memo(function CheckList({ items, tone = 'dark', className = '' }: CheckListProps) {
  return (
    <ul className={['check-list', `check-list--${tone}`, className].filter(Boolean).join(' ')}>
      {items.map((item) => (
        <li key={item} className="check-list__item">
          <Icon name="check" size={16} className="check-list__icon" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
});
