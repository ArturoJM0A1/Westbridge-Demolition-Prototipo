/* ============================================================
   Header — sticky masthead: utility bar, brand, navbar, CTA.
   Includes animated mobile menu handled by MobileMenu.
   ============================================================ */

import { memo, useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/Logo';
import { Navbar } from '@/layout/Navbar';
import { MobileMenu } from '@/layout/MobileMenu';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { CONTACT, NAV_LINKS } from '@/constants/site';

const UTILITY_ITEMS: { icon: IconName; text: string; href?: string }[] = [
  { icon: 'phone', text: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: 'mail', text: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: 'map-pin', text: CONTACT.serviceArea },
  { icon: 'clock', text: CONTACT.hours },
];

export const Header = memo(function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__utility">
        <div className="container site-header__utility-inner">
          <p className="site-header__utility-item">
            <Icon name="map-pin" size={14} />
            {CONTACT.serviceArea}
          </p>
          <ul className="site-header__utility-list">
            {UTILITY_ITEMS.slice(0, 3).map((item) => (
              <li key={item.icon + item.text} className="site-header__utility-item">
                {item.href ? (
                  <a href={item.href}>
                    <Icon name={item.icon} size={14} />
                    {item.text}
                  </a>
                ) : (
                  <>
                    <Icon name={item.icon} size={14} />
                    {item.text}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-header__main">
        <div className="container site-header__main-inner">
          <Logo tone={isScrolled ? 'dark' : 'dark'} />

          <Navbar className="site-header__nav" />

          <div className="site-header__actions">
            <Button
              as="link"
              to="/contacto"
              variant="accent"
              size="sm"
              icon="arrow-right"
              className="site-header__cta"
            >
              Solicitar estimado
            </Button>
            <button
              ref={menuButtonRef}
              className={`hamburger ${isMenuOpen ? 'hamburger--open' : ''}`}
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span className="hamburger__line" />
              <span className="hamburger__line" />
              <span className="hamburger__line" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={NAV_LINKS}
        triggerRef={menuButtonRef}
      />
    </header>
  );
});
