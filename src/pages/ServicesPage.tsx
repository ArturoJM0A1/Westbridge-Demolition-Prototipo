/* ============================================================
   ServicesPage — full catalog of service lines.
   ============================================================ */

import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Grid } from '@/components/ui/Grid';
import { ServiceCard } from '@/components/ServiceCard';
import { CtaBand } from '@/components/ui/CtaBand';
import { Reveal } from '@/components/ui/Reveal';
import { IconTile } from '@/components/IconTile';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';

const HIGHLIGHTS = [
  {
    icon: 'shield' as const,
    title: 'Permisos gestionados',
    text: 'Nos encargamos de la tramitación municipal completa.',
  },
  {
    icon: 'truck' as const,
    title: 'Flota propia',
    text: 'Recursos disponibles, sin esperas de terceros.',
  },
  {
    icon: 'recycle' as const,
    title: 'Reciclaje certificado',
    text: '91% de desvío de escombros con manifiestos.',
  },
  {
    icon: 'clock' as const,
    title: 'Respuesta en 48h',
    text: 'Estimados con plan y cronograma cerrados.',
  },
];

export default function ServicesPage() {
  const { data: services, isLoading, error, retry } = useAsyncData(contentService.getServices);

  const heroCrumbs = [{ label: 'Inicio', to: '/' }, { label: 'Servicios' }];

  return (
    <>
      <PageHero
        kicker="Servicios"
        title="Demolición comercial sin fricciones"
        description="Siete especialidades, un solo estándar: ingeniería previa, ejecución certificada y entrega documentada."
        imageSrc="https://picsum.photos/seed/wb-service-1/1600/900"
        imageAlt="Servicios de demolición de Westbridge"
        crumbs={heroCrumbs}
      />

      <Section>
        <SectionHeading
          kicker="Nuestras especialidades"
          title="Todo el ciclo de la demolición"
          description="Selecciona un servicio para conocer alcance, beneficios y resultados. Todos pueden combinarse bajo un mismo contrato."
        />

        {isLoading && <Loader />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {services && (
          <Grid cols={3}>
            {services.map((service, index) => (
              <Reveal key={service.id} delay={(index % 3) * 90}>
                <ServiceCard service={service} index={index} />
              </Reveal>
            ))}
          </Grid>
        )}
      </Section>

      <Section variant="alt">
        <SectionHeading
          kicker="Por qué contratar a Westbridge"
          title="El servicio viene con estas garantías"
          align="center"
        />
        <div className="services-highlights">
          {HIGHLIGHTS.map((highlight, index) => (
            <Reveal key={highlight.title} delay={index * 80}>
              <div className="services-highlights__item">
                <IconTile icon={highlight.icon} tone="dark" />
                <h3>{highlight.title}</h3>
                <p>{highlight.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="¿No sabes qué servicio necesitas?"
        description="Haznos una llamada. Un ingeniero de demolición te orientará sobre el alcance correcto para tu proyecto, sin costo."
      />
    </>
  );
}
