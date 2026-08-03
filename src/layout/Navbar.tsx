/* ============================================================
   Navbar — desktop navigation with active link state.
   ============================================================ */

import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '@/constants/site';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(function Navbar({ className = '' }: NavbarProps) {
  return (
    <nav className={['navbar', className].filter(Boolean).join(' ')} aria-label="Navegación principal">
      <ul className="navbar__list">
        {NAV_LINKS.map((link) => (
          <li key={link.to} className="navbar__item">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                ['navbar__link', isActive ? 'navbar__link--active' : ''].join(' ').trim()
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
});
