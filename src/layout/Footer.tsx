/* ============================================================
   Footer — brand, navigation, services, contact and legal bar.
   ============================================================ */

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { CONTACT, NAV_LINKS, SITE, SOCIAL_LINKS } from '@/constants/site';

const SERVICE_LINKS = [
  { label: 'Demolición estructural', to: '/servicios/demolicion-estructural' },
  { label: 'Demolición interior', to: '/servicios/demolicion-interior' },
  { label: 'Demolición selectiva', to: '/servicios/demolicion-selectiva' },
  { label: 'Excavación y tierras', to: '/servicios/excavacion' },
  { label: 'Reciclaje de escombros', to: '/servicios/reciclaje' },
];

const CONTACT_ROWS: { icon: IconName; text: string; href?: string }[] = [
  { icon: 'phone', text: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: 'mail', text: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: 'map-pin', text: CONTACT.address },
];

export const Footer = memo(function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Logo tone="light" />
            <p className="site-footer__about">
              Contratista comercial de demolición con más de {SITE.yearsOfExperience} años de
              experiencia en el sur de Florida. Ingeniería, seguridad y sostenibilidad en cada
              proyecto.
            </p>
            <ul className="site-footer__social">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Icon name={social.icon as IconName} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="site-footer__column" aria-label="Navegación del sitio">
            <p className="site-footer__heading">Sitio</p>
            <ul className="site-footer__links">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__column" aria-label="Servicios">
            <p className="site-footer__heading">Servicios</p>
            <ul className="site-footer__links">
              {SERVICE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__column">
            <p className="site-footer__heading">Contacto</p>
            <ul className="site-footer__contact">
              {CONTACT_ROWS.map((row) => (
                <li key={row.text}>
                  <Icon name={row.icon} size={16} />
                  {row.href ? <a href={row.href}>{row.text}</a> : <span>{row.text}</span>}
                </li>
              ))}
            </ul>
            <p className="site-footer__hours">{CONTACT.hours}</p>
          </div>
        </div>

        <div className="site-footer__certifications">
          <p>OSHA 30 · FDOT Qualified · Florida DEP Lic. · ISNetworld® Verified</p>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {new Date().getFullYear()} {SITE.name} {SITE.suffix}. Todos los derechos reservados.
          </p>
          <p>
            Contratista licenciado en Florida · Lic. #CGC-0000000 · Estimados gratuitos en 48h
          </p>
        </div>
      </Container>
    </footer>
  );
});
