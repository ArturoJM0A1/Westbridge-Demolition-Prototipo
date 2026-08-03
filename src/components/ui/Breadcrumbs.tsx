/* ============================================================
   Breadcrumbs — navigation trail for deep pages.
   ============================================================ */

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';

export interface Crumb {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export const Breadcrumbs = memo(function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav className={['breadcrumbs', className].filter(Boolean).join(' ')} aria-label="Ruta de navegación">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="breadcrumbs__item">
              {!isLast && item.to ? (
                <Link to={item.to} className="breadcrumbs__link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <Icon name="chevron-right" size={14} className="breadcrumbs__sep" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
