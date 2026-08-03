/* ============================================================
   MobileMenu — animated full-height drawer for small screens.
   ============================================================ */

import { memo, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { CONTACT } from '@/constants/site';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: ReadonlyArray<{ label: string; to: string }>;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

export const MobileMenu = memo(function MobileMenu({
  open,
  onClose,
  links,
  triggerRef,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);
  useEscapeKey(onClose, open);
  useOnClickOutside(panelRef, onClose, open, [triggerRef]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
    >
      <div className="mobile-menu__panel" ref={panelRef}>
        <header className="mobile-menu__header">
          <Logo tone="light" />
          <button className="mobile-menu__close" onClick={onClose} aria-label="Cerrar menú">
            <Icon name="close" size={24} />
          </button>
        </header>

        <nav className="mobile-menu__nav" aria-label="Navegación móvil">
          <ul className="mobile-menu__list">
            {links.map((link, index) => (
              <li key={link.to} className="mobile-menu__item">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    ['mobile-menu__link', isActive ? 'mobile-menu__link--active' : '']
                      .join(' ')
                      .trim()
                  }
                  onClick={onClose}
                >
                  <span className="mobile-menu__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                  <Icon name="arrow-up-right" size={18} className="mobile-menu__arrow" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu__footer">
          <Button as="link" to="/contacto" variant="accent" fullWidth icon="arrow-right" onClick={onClose}>
            Solicitar estimado
          </Button>
          <ul className="mobile-menu__contact">
            <li>
              <Icon name="phone" size={16} />
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </li>
            <li>
              <Icon name="mail" size={16} />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});
