/* ============================================================
   ProjectDetailPage — single project portfolio view.
   ============================================================ */

import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { CheckList } from '@/components/CheckList';
import { Gallery } from '@/components/Gallery';
import { Banner } from '@/components/ui/Banner';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { CtaBand } from '@/components/ui/CtaBand';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';
import type { Project } from '@/types';
import { NotFoundPage } from '@/pages/NotFoundPage';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, error, retry } = useAsyncData(() =>
    contentService.getProjectBySlug(slug ?? ''),
  );
  const { data: allProjects } = useAsyncData(contentService.getProjects);
  const { data: categories } = useAsyncData(contentService.getProjectCategories);

  const facts = useMemo(() => {
    if (!project) return [];
    return [
      { icon: 'building' as IconName, label: 'Cliente', value: project.client },
      { icon: 'map-pin' as IconName, label: 'Ubicación', value: project.location },
      { icon: 'clock' as IconName, label: 'Duración', value: project.duration },
      { icon: 'calendar' as IconName, label: 'Año', value: project.year },
      { icon: 'layers' as IconName, label: 'Tamaño', value: project.size },
      { icon: 'diamond' as IconName, label: 'Presupuesto', value: project.budget },
    ];
  }, [project]);

  const siblings = useMemo<{ previous: Project; next: Project } | null>(() => {
    if (!project || !allProjects) return null;
    const index = allProjects.findIndex((item) => item.id === project.id);
    const previous =
      index > 0 ? allProjects[index - 1] : allProjects[allProjects.length - 1];
    const next = index < allProjects.length - 1 ? allProjects[index + 1] : allProjects[0];
    return { previous, next };
  }, [allProjects, project]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={retry} />;
  if (!project) return <NotFoundPage />;

  const categoryLabel =
    categories?.find((category) => category.id === project.categoryId)?.label ??
    project.categoryId;

  return (
    <>
      <PageHero
        kicker={`Proyecto · ${categoryLabel}`}
        title={project.title}
        description={project.summary}
        imageSrc={project.image.src}
        imageAlt={project.image.alt}
        crumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Proyectos', to: '/proyectos' },
          { label: project.title },
        ]}
      />

      <Section>
        <Container>
          <div className="project-detail">
            <article className="project-detail__main">
              <SectionHeading
                kicker="El proyecto"
                title={project.title}
                description={project.description}
              />

              <div className="project-detail__section">
                <h2 className="project-detail__subtitle">Alcance de los trabajos</h2>
                <CheckList items={project.scope} />
              </div>

              <div className="project-detail__section">
                <h2 className="project-detail__subtitle">Resultados obtenidos</h2>
                <Banner tone="success" title="Entrega y resultados">
                  <CheckList items={project.results} />
                </Banner>
              </div>

              <div className="project-detail__section">
                <h2 className="project-detail__subtitle">Galería</h2>
                <Gallery images={project.gallery} title={project.title} />
              </div>
            </article>

            <aside className="project-detail__aside">
              <Card className="project-detail__facts">
                <p className="project-detail__facts-title">Ficha técnica</p>
                <ul className="project-detail__facts-list">
                  {facts.map((fact) => (
                    <li key={fact.label} className="project-detail__fact">
                      <Icon name={fact.icon} size={18} className="project-detail__fact-icon" />
                      <span className="project-detail__fact-label">{fact.label}</span>
                      <span className="project-detail__fact-value">{fact.value}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <div className="project-detail__card-cta">
                <p>
                  ¿Tienes un proyecto con requisitos similares?
                </p>
                <Button as="link" to="/contacto" variant="accent" icon="arrow-right" fullWidth>
                  Solicitar estimado
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {siblings && (
        <Section variant="alt">
          <Container>
            <nav className="project-nav" aria-label="Navegación entre proyectos">
              <Link to={`/proyectos/${siblings.previous.slug}`} className="project-nav__link">
                <Icon name="arrow-left" size={18} />
                <span>
                  <small>Anterior</small>
                  {siblings.previous.title}
                </span>
              </Link>
              <Link to={`/proyectos/${siblings.next.slug}`} className="project-nav__link project-nav__link--next">
                <span>
                  <small>Siguiente</small>
                  {siblings.next.title}
                </span>
                <Icon name="arrow-right" size={18} />
              </Link>
            </nav>
          </Container>
        </Section>
      )}

      <CtaBand
        title={`¿Listo para un proyecto como ${project.title}?`}
        description="Déjanos demostrarte cómo lo haríamos, con seguridad y a tiempo."
      />
    </>
  );
}
