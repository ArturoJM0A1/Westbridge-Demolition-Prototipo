/* ============================================================
   ContactPage — form, contact channels and map.
   ============================================================ */

import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';
import { Icon, type IconName } from '@/components/ui/Icon';
import { ContactForm } from '@/components/contact/ContactForm';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { Reveal } from '@/components/ui/Reveal';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';
import { CONTACT } from '@/constants/site';

const CHANNELS: { icon: IconName; title: string; text: string; href?: string }[] = [
  { icon: 'phone', title: 'Teléfono', text: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: 'mail', title: 'Correo', text: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: 'map-pin', title: 'Oficina', text: CONTACT.address },
  { icon: 'clock', title: 'Horario', text: CONTACT.hours },
];

export default function ContactPage() {
  const { data: services, isLoading, error, retry } = useAsyncData(contentService.getServices);
  const { data: faqs } = useAsyncData(contentService.getFaqs);

  const heroCrumbs = [{ label: 'Inicio', to: '/' }, { label: 'Contacto' }];

  return (
    <>
      <PageHero
        kicker="Contacto"
        title="Hablemos de tu próximo proyecto"
        description="Estimados gratuitos con respuesta en 48 horas. Este es el primer paso de un proyecto sin sorpresas."
        imageSrc="https://picsum.photos/seed/wb-cta/1600/900"
        imageAlt="Contacto Westbridge Demolition"
        crumbs={heroCrumbs}
      />

      <Section>
        <Container>
          <div className="contact-grid">
            <div className="contact-grid__info">
              <SectionHeading
                kicker="Canal directo"
                title="Escríbenos o llámanos"
                description="Nuestro equipo de estimados está listo para escuchar tu proyecto. Elige el canal que prefieras."
              />

              <div className="contact-channels">
                {CHANNELS.map((channel) => (
                  <Card key={channel.title} className="contact-channel">
                    <span className="contact-channel__icon" aria-hidden="true">
                      <Icon name={channel.icon} size={22} />
                    </span>
                    <div>
                      <h3 className="contact-channel__title">{channel.title}</h3>
                      {channel.href ? (
                        <a className="contact-channel__value" href={channel.href}>
                          {channel.text}
                        </a>
                      ) : (
                        <p className="contact-channel__value">{channel.text}</p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="contact-grid__map">
                <iframe
                  title="Mapa de área de servicio de Westbridge Demolition"
                  src={CONTACT.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="contact-grid__form">
              <Card className="contact-grid__form-card">
                <Reveal>
                  <SectionHeading
                    kicker="Estimado gratuito"
                    title="Solicita tu cotización"
                    description="Completa el formulario y recibe una propuesta con alcance cerrado en un máximo de 48 horas."
                  />
                </Reveal>

                {isLoading && <Loader fullHeight={false} />}
                {error && <ErrorState message={error} onRetry={retry} />}
                {services && <ContactForm services={services} />}
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {faqs && faqs.length > 0 && (
        <Section variant="alt">
          <Container className="faq-section">
            <SectionHeading
              kicker="Preguntas frecuentes"
              title="Antes de escribirnos, esto te puede ayudar"
              align="center"
            />
            <Reveal>
              <Accordion items={faqs} />
            </Reveal>
          </Container>
        </Section>
      )}
    </>
  );
}
