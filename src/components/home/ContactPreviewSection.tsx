/* ============================================================
   Home · Contact Preview — final contact section.
   ============================================================ */

import { memo } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { CONTACT } from '@/constants/site';

const CONTACT_ROWS: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: 'phone', label: 'Teléfono', value: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: 'mail', label: 'Correo', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: 'map-pin', label: 'Oficina', value: CONTACT.address },
  { icon: 'clock', label: 'Horario', value: CONTACT.hours },
];

export const ContactPreviewSection = memo(function ContactPreviewSection() {
  return (
    <Section variant="alt" id="contacto-preview">
      <div className="contact-preview">
        <div className="contact-preview__content">
          <Reveal>
            <SectionHeading
              kicker="Contacto"
              title="Hablemos de tu próximo proyecto"
              description="Cuéntanos qué necesitas demoler, renovar o transformar. Respondemos con un plan claro y un estimado en un máximo de 48 horas."
            />
          </Reveal>
          <Reveal delay={120}>
            <ul className="contact-preview__list">
              {CONTACT_ROWS.map((row) => (
                <li key={row.label} className="contact-preview__row">
                  <span className="contact-preview__icon" aria-hidden="true">
                    <Icon name={row.icon} size={20} />
                  </span>
                  <div>
                    <small>{row.label}</small>
                    {row.href ? <a href={row.href}>{row.value}</a> : <p>{row.value}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="contact-preview__panel">
          <Reveal delay={160}>
            <div className="contact-preview__card">
              <span className="contact-preview__card-mark" aria-hidden="true">
                <Icon name="zap" size={26} />
              </span>
              <h3 className="contact-preview__card-title">Estimado gratuito</h3>
              <p className="contact-preview__card-text">
                Visita al sitio, revisión de planos y propuesta cerrada por alcance. Sin
                compromiso y sin letra pequeña.
              </p>
              <ul className="contact-preview__card-list">
                <li>Respuesta en 48 horas</li>
                <li>Ingeniería de reversa incluida</li>
                <li>Evaluación ambiental preliminar</li>
              </ul>
              <Button as="link" to="/contacto" variant="accent" size="lg" icon="arrow-right" fullWidth>
                Solicitar estimado
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
});
