/* ============================================================
   WhyWestbridgePage — value proposition and differentiators.
   ============================================================ */

import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { IconTile } from '@/components/IconTile';
import { type IconName } from '@/components/ui/Icon';
import { CheckList } from '@/components/CheckList';
import { CtaBand } from '@/components/ui/CtaBand';
import { Reveal } from '@/components/ui/Reveal';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';

export default function WhyWestbridgePage() {
  const { data: advantages, isLoading, error, retry } = useAsyncData(contentService.getAdvantages);
  const { data: why } = useAsyncData(contentService.getWhy);

  const heroCrumbs = [
    { label: 'Inicio', to: '/' },
    { label: 'Por qué Westbridge' },
  ];

  return (
    <>
      <PageHero
        kicker="Por qué Westbridge"
        title="Razones medibles, no promesas"
        description="Elegir contratista de demolición es elegir riesgo. Estos son los cuatro argumentos que convierten a Westbridge en la decisión más segura del sur de Florida."
        imageSrc="https://picsum.photos/seed/wb-safety-hero/1600/900"
        imageAlt="Seguridad y cumplimiento en Westbridge"
        crumbs={heroCrumbs}
      />

      <Section>
        <SectionHeading
          kicker="Los cuatro argumentos"
          title="Donde realmente marcamos la diferencia"
          description="Cada argumento tiene evidencia detrás: métricas de obra, certificaciones y referencias verificables."
        />

        {isLoading && <Loader />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {advantages && (
          <Grid cols={4}>
            {advantages.map((advantage, index) => (
              <Reveal key={advantage.id} delay={(index % 4) * 70}>
                <Card as="article" className="advantage-card">
                  <div className="advantage-card__top">
                    <IconTile icon={advantage.icon as IconName} tone="dark" />
                    <span className="advantage-card__stat">{advantage.stat.value}</span>
                  </div>
                  <h3 className="advantage-card__title">{advantage.title}</h3>
                  <p className="advantage-card__description">{advantage.description}</p>
                  <p className="advantage-card__stat-label">{advantage.stat.label}</p>
                </Card>
              </Reveal>
            ))}
          </Grid>
        )}
      </Section>

      {why && (
        <>
          <Section variant="alt">
            <SectionHeading
              kicker="Qué nos hace distintos"
              title="Cuatro diferencias que notarás desde la primera reunión"
            />
            <div className="differentiators">
              {why.differentiators.map((item, index) => (
                <Reveal key={item.id} delay={index * 80}>
                  <div className="differentiator">
                    <span className="differentiator__index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="differentiator__body">
                      <h3 className="differentiator__title">{item.title}</h3>
                      <p className="differentiator__text">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          <Section variant="inverse-2">
            <div className="commitments">
              <div className="commitments__text">
                <SectionHeading
                  kicker="Nuestro compromiso"
                  title="Cinco reglas que nunca rompemos"
                  description="Escritas en la pared de cada bodega y en la memoria de cada superintendente."
                  tone="light"
                />
              </div>
              <div className="commitments__list">
                <CheckList items={why.commitments} tone="light" />
              </div>
            </div>
          </Section>
        </>
      )}

      <CtaBand
        title="Pon a prueba estos argumentos"
        description="Pídenos referencias de tu industria y una visita al sitio. Deja que los números hablen por nosotros."
      />
    </>
  );
}
