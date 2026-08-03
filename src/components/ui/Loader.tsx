/* ============================================================
   Loader — full-area loading state with animated spinner.
   ============================================================ */

import { memo } from 'react';
import { SITE } from '@/constants/site';

interface LoaderProps {
  label?: string;
  fullHeight?: boolean;
}

export const Loader = memo(function Loader({
  label = 'Cargando contenido',
  fullHeight = true,
}: LoaderProps) {
  return (
    <div
      className="loader"
      role="status"
      aria-live="polite"
      style={fullHeight ? { minHeight: '50vh' } : undefined}
    >
      <span className="loader__spinner" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <p className="loader__brand">{SITE.name}</p>
      <p className="loader__label">{label}…</p>
    </div>
  );
});
