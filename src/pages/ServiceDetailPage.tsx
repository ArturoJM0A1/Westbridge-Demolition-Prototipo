/* ============================================================
   ServiceDetailPage — deep dive into a single service.
   ============================================================ */

import { Link, useParams } from 'react-router-dom';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { SmartImage } from '@/components/ui/SmartImage';
import { CheckList } from '@/components/CheckList';
import { IconTile } from '@/components/IconTile';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Banner } from '@/components/ui/Banner';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { CtaBand } from '@/components/ui/CtaBand';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';
import { NotFoundPage } from '@/pages/NotFoundPage';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading, error, retry } = useAsyncData(() =>
    contentService.getServiceBySlug(slug ?? ''),
  );
  const { data: allServices } = useAsyncData(contentService.getServices);

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={retry} />;
  if (!service) return <NotFoundPage />;

  const related = (allServices ?? [])
    .filter((item) => item.id !== service.id)
    .slice(0, 3);

  return (
    <>
      <PageHero
        kicker="Servicio"
        title={service.title}
        description={service.shortDescription}
        imageSrc={service.image.src}
        imageAlt={service.image.alt}
        crumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Servicios', to: '/servicios' },
          { label: service.title },
        ]}
      />

      <Section>
        <Container>
          <div className="service-detail">
            <article className="service-detail__main">
              <SmartImage
                src={service.image.src}
                alt={service.image.alt}
                ratio="16 / 7"
                eager
              />

              <SectionHeading
                kicker="Acerca de este servicio"
                title={service.title}
                description={service.description}
              />

              <div className="service-detail__result">
                <Banner tone="success" title="Resultados que entregamos">
                  {service.results}
                </Banner>
              </div>
            </article>

            <aside className="service-detail__aside">
              <Card className="service-detail__fact">
                <IconTile icon={service.icon as IconName} tone="accent" />
                <p className="service-detail__fact-label">Beneficios clave</p>
                <CheckList items={service.benefits} />
              </Card>

              <Card className="service-detail__fact">
                <p className="service-detail__fact-label">Alcance del servicio</p>
                <ul className="scope-list">
                  {service.scope.map((item) => (
                    <li key={item} className="scope-list__item">
                      <Icon name="chevron-right" size={15} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              <div className="service-detail__quote">
                <p className="service-detail__quote-text">
                  “Cada servicio se cotiza con alcance cerrado. Lo que prometemos es lo que
                  entregamos.”
                </p>
                <Button as="link" to="/contacto" variant="accent" icon="arrow-right" fullWidth>
                  Cotizar este servicio
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section variant="alt">
        <SectionHeading kicker="Relacionados" title="Otros servicios que puedes combinar" />
        <Grid cols={3}>
          {related.map((item) => (
            <Card key={item.id} className="related-service" interactive>
              <Link to={`/servicios/${item.slug}`} className="related-service__link">
                <div className="related-service__media">
                  <SmartImage src={item.image.src} alt={item.image.alt} ratio="16 / 9" />
                </div>
                <div className="related-service__body">
                  <h3 className="related-service__title">{item.title}</h3>
                  <p className="related-service__text">{item.shortDescription}</p>
                  <span className="related-service__cta">Ver servicio</span>
                </div>
              </Link>
            </Card>
          ))}
        </Grid>
      </Section>

      <CtaBand
        title={`Cotiza ${service.title.toLowerCase()}`}
        description="Envía tus planos o una breve descripción y recibe un estimado con plan de trabajo en 48 horas."
      />
    </>
  );
}
