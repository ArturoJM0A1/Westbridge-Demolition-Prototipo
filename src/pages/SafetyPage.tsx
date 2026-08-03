/* ============================================================
   SafetyPage — safety culture, certifications and standards.
   ============================================================ */

import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { SmartImage } from '@/components/ui/SmartImage';
import { IconTile } from '@/components/IconTile';
import { Icon, type IconName } from '@/components/ui/Icon';
import { CtaBand } from '@/components/ui/CtaBand';
import { Reveal } from '@/components/ui/Reveal';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';

export default function SafetyPage() {
  const { data: safety, isLoading, error, retry } = useAsyncData(contentService.getSafety);
  const { data: certifications } = useAsyncData(contentService.getCertifications);

  const heroCrumbs = [
    { label: 'Inicio', to: '/' },
    { label: 'Seguridad y Certificaciones' },
  ];

  return (
    <>
      <PageHero
        kicker="Seguridad y certificaciones"
        title="La seguridad no es un eslogan. Es un sistema."
        description="Un programa de seguridad auditable, cuadrillas certificadas y estándares que superan la normativa. Así se ve una cultura de cero incidentes."
        imageSrc="https://picsum.photos/seed/wb-safety-hero/1600/900"
        imageAlt="Cultura de seguridad en Westbridge Demolition"
        crumbs={heroCrumbs}
      />

      {isLoading && <Loader />}
      {error && <ErrorState message={error} onRetry={retry} />}

      {safety && (
        <>
          <Section variant="inverse-2">
            <div className="safety-stats">
              {safety.stats.map((stat) => (
                <div className="safety-stat" key={stat.id}>
                  <p className="safety-stat__value">{stat.value}</p>
                  <p className="safety-stat__label">{stat.label}</p>
                  <p className="safety-stat__detail">{stat.detail}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section>
            <SectionHeading
              kicker="Cómo trabajamos"
              title="Cuatro pilares de la seguridad"
              description="Ninguno funciona solo. El sistema funciona porque los cuatro operan en paralelo en cada obra, todos los días."
            />
            <Grid cols={4}>
              {safety.pillars.map((pillar, index) => (
                <Reveal key={pillar.id} delay={(index % 4) * 70}>
                  <Card as="article" className="pillar-card">
                    <IconTile icon={pillar.icon as IconName} tone="accent" />
                    <h3 className="pillar-card__title">{pillar.title}</h3>
                    <p className="pillar-card__description">{pillar.description}</p>
                  </Card>
                </Reveal>
              ))}
            </Grid>
          </Section>

          <Section variant="alt">
            <div className="split">
              <div className="split__media">
                <Reveal>
                  <SmartImage
                    src="https://picsum.photos/seed/wb-safety-culture/1600/900"
                    alt="Entrenamiento de seguridad en campo"
                    ratio="4 / 5"
                    className="split__image"
                  />
                </Reveal>
              </div>
              <div className="split__content">
                <Reveal>
                  <SectionHeading
                    kicker="Cultura en campo"
                    title="El proceso de seguridad, paso a paso"
                    description="Cada proyecto recorre el mismo proceso certificado, desde la primera visita hasta la entrega del sitio."
                  />
                </Reveal>
                <Reveal delay={120}>
                  <ol className="safety-process">
                    {safety.process.map((step, index) => (
                      <li key={step.id} className="safety-process__step">
                        <span className="safety-process__number">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className="safety-process__title">{step.title}</h3>
                          <p className="safety-process__detail">{step.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            </div>
          </Section>

          <Section>
            <SectionHeading
              kicker="Certificaciones"
              title="Credenciales verificables"
              description="Nuestro cumplimiento es público y auditado por clientes, aseguradoras y agencias reguladoras."
            />
            {certifications && (
              <Grid cols={3}>
                {certifications.map((cert, index) => (
                  <Reveal key={cert.id} delay={(index % 3) * 80}>
                    <Card as="article" className="certification-card">
                      <div className="certification-card__head">
                        <IconTile icon={cert.icon as IconName} tone="dark" />
                        <Icon name="check-circle" size={22} className="certification-card__check" />
                      </div>
                      <h3 className="certification-card__name">{cert.name}</h3>
                      <p className="certification-card__issuer">{cert.issuer}</p>
                      <p className="certification-card__description">{cert.description}</p>
                    </Card>
                  </Reveal>
                ))}
              </Grid>
            )}
          </Section>

          <Section variant="alt">
            <div className="standards">
              <SectionHeading
                kicker="Estándares"
                title="Alineados con las normas que importan"
                align="center"
              />
              <div className="standards__grid">
                {safety.standards.map((standard) => (
                  <div className="standard-chip" key={standard.id}>
                    <span className="standard-chip__icon" aria-hidden="true">
                      <Icon name="badge" size={22} />
                    </span>
                    <div>
                      <h3>{standard.title}</h3>
                      <p>{standard.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </>
      )}

      <CtaBand
        title="Exige transparencia en seguridad"
        description="Solicita nuestro programa EHS y las métricas de seguridad de tus últimos proyectos. Estamos listos para mostrártelas."
      />
    </>
  );
}
