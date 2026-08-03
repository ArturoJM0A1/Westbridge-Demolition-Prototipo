/* ============================================================
   Home · Featured Projects — recent work preview.
   ============================================================ */

import { memo } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ProjectCard';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';

export const FeaturedProjectsSection = memo(function FeaturedProjectsSection() {
  const { data: projects, isLoading, error, retry } = useAsyncData(contentService.getProjects);
  const { data: categories } = useAsyncData(contentService.getProjectCategories);

  const categoryLabel = (categoryId: string) =>
    categories?.find((category) => category.id === categoryId)?.label ?? categoryId;

  return (
    <Section variant="inverse">
      <SectionHeading
        kicker="Portafolio"
        title="Proyectos que hablan por nosotros"
        description="Una muestra del trabajo reciente: derribos estructurales, reconversiones industriales y demoliciones de precisión en entornos sensibles."
        tone="light"
      />

      {isLoading && <Loader fullHeight={false} />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {projects && (
        <Stagger className="grid grid--3 grid--gap-md">
          {projects.slice(0, 3).map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} categoryLabel={categoryLabel(project.categoryId)} />
            </StaggerItem>
          ))}
        </Stagger>
      )}

      <div className="home-projects__action">
        <Button as="link" to="/proyectos" variant="outline-light" size="lg" icon="arrow-right">
          Ver portafolio completo
        </Button>
      </div>
    </Section>
  );
});
