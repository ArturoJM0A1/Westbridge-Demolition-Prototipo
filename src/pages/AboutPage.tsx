/* ============================================================
   AboutPage — history, mission/vision/values, philosophy,
   operational capacity.
   ============================================================ */

import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { SmartImage } from '@/components/ui/SmartImage';
import { IconTile } from '@/components/IconTile';
import { CheckList } from '@/components/CheckList';
import { Timeline } from '@/components/Timeline';
import { CtaBand } from '@/components/ui/CtaBand';
import { Reveal } from '@/components/ui/Reveal';
import { type IconName } from '@/components/ui/Icon';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';
import { SITE } from '@/constants/site';

export default function AboutPage() {
  const { data: company, isLoading, error, retry } = useAsyncData(contentService.getCompany);
  const { data: values } = useAsyncData(contentService.getValues);

  const heroCrumbs = [{ label: 'Inicio', to: '/' }, { label: 'Nosotros' }];

  return (
    <>
      <PageHero
        kicker="Sobre nosotros"
        title="La disciplina detrás de cada derribo"
        description="Dos décadas construyendo una reputación de seguridad, ingeniería y cumplimiento en el sur de Florida."
        imageSrc="https://picsum.photos/seed/wb-about-history/1600/900"
        imageAlt="Historia de Westbridge Demolition"
        crumbs={heroCrumbs}
      />

      {isLoading && <Loader />}
      {error && <ErrorState message={error} onRetry={retry} />}

      {company && (
        <>
          <Section>
            <div className="split">
              <div className="split__content">
                <Reveal>
                  <SectionHeading
                    kicker="Nuestra historia"
                    title={`Desde 2003, ${SITE.yearsOfExperience} años de confianza`}
                    description={company.history.origin}
                  />
                </Reveal>
                <Reveal delay={100}>
                  <p className="prose">
                    Lo que comenzó como una operación de dos cuadrillas en Hialeah es hoy el
                    contratista de referencia para desarrolladores, fondos de inversión y sistemas
                    de salud en todo el sur de Florida. Crecimos sin perder el origen: cada
                    proyecto se ejecuta como si fuera el único.
                  </p>
                </Reveal>
                <Reveal delay={160}>
                  <CheckList
                    items={[
                      '480+ proyectos entregados desde la fundación',
                      'Contratista licenciado y con fianza en Florida',
                      'Operaciones en Miami-Dade, Broward y Palm Beach',
                    ]}
                  />
                </Reveal>
              </div>
              <div className="split__media">
                <Reveal>
                  <SmartImage
                    src="https://picsum.photos/seed/wb-about-operations/1600/900"
                    alt="Operación de demolición controlada"
                    ratio="4 / 5"
                    className="split__image"
                  />
                </Reveal>
              </div>
            </div>
          </Section>

          <Section variant="alt">
            <SectionHeading
              kicker="Trayectoria"
              title="Hitos que definen a Westbridge"
              description="Cada etapa nos preparó para la siguiente. Esta es la línea de tiempo de una empresa construida para durar."
            />
            <Reveal>
              <Timeline items={company.history.milestones} />
            </Reveal>
          </Section>
        </>
      )}

      {values && (
        <Section variant="inverse-2">
          <SectionHeading
            kicker="Propósito"
            title="Misión, visión y valores"
            tone="light"
          />
          <Grid cols={3}>
            {values.map((value, index) => (
              <Reveal key={value.id} delay={(index % 3) * 90}>
                <Card as="article" className="value-card">
                  <IconTile icon={value.icon as IconName} tone="accent" />
                  <h3 className="value-card__title">{value.title}</h3>
                  <p className="value-card__description">{value.description}</p>
                </Card>
              </Reveal>
            ))}
          </Grid>
        </Section>
      )}

      {company && (
        <>
          <Section>
            <div className="philosophy">
              <Reveal>
                <SectionHeading
                  kicker="Filosofía de trabajo"
                  title={company.philosophy.title}
                  description={company.philosophy.intro}
                />
              </Reveal>
              <Reveal delay={120}>
                <div className="philosophy__principles">
                  {company.philosophy.principles.map((principle, index) => (
                    <div className="philosophy__principle" key={principle}>
                      <span className="philosophy__index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p>{principle}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </Section>

          <Section variant="alt">
            <div className="split">
              <div className="split__content">
                <Reveal>
                  <SectionHeading
                    kicker="Capacidad operativa"
                    title={company.capacity.title}
                    description={company.capacity.intro}
                  />
                </Reveal>
                <div className="capacity-grid">
                  {company.capacity.highlights.map((highlight, index) => (
                    <Reveal key={highlight.id} delay={index * 80}>
                      <div className="capacity-item">
                        <IconTile icon={highlight.icon as IconName} tone="dark" />
                        <div>
                          <h3 className="capacity-item__title">{highlight.title}</h3>
                          <p className="capacity-item__detail">{highlight.detail}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              <div className="split__media">
                <Reveal>
                  <SmartImage
                    src="https://picsum.photos/seed/wb-about-operations/1600/900"
                    alt="Flota y capacidad operativa de Westbridge"
                    ratio="4 / 5"
                    className="split__image"
                  />
                </Reveal>
              </div>
            </div>
          </Section>
        </>
      )}

      <CtaBand
        title="¿Quieres saber si Westbridge es el contratista indicado?"
        description="Agenda una reunión de calificación. Te mostraremos referencias, seguridad y resultados de proyectos comparables al tuyo."
      />
    </>
  );
}
