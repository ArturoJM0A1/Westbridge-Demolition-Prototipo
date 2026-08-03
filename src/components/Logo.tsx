/* ============================================================
   Logo — brand mark. Dark or light variant by context.
   ============================================================ */

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '@/constants/site';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
}

export const Logo = memo(function Logo({ tone = 'dark', className = '' }: LogoProps) {
  return (
    <Link
      to="/"
      className={['logo', `logo--${tone}`, className].filter(Boolean).join(' ')}
      aria-label={`${SITE.name} ${SITE.suffix} — inicio`}
    >
      <span className="logo__mark" aria-hidden="true">
        <span className="logo__mark-bar" />
        <span className="logo__mark-bar logo__mark-bar--accent" />
      </span>
      <span className="logo__text">
        <span className="logo__name">{SITE.name}</span>
        <span className="logo__suffix">{SITE.suffix}</span>
      </span>
    </Link>
  );
});
