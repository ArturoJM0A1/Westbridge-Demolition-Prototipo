/* ============================================================
   ProjectsPage — filterable portfolio gallery.
   ============================================================ */

import { useMemo, useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ProjectMasonryCard } from '@/components/ProjectMasonryCard';
import { Reveal } from '@/components/ui/Reveal';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { CtaBand } from '@/components/ui/CtaBand';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';

const ALL_CATEGORIES = 'all';

export default function ProjectsPage() {
  const { data: projects, isLoading, error, retry } = useAsyncData(contentService.getProjects);
  const { data: categories } = useAsyncData(contentService.getProjectCategories);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (activeCategory === ALL_CATEGORIES) return projects;
    return projects.filter((project) => project.categoryId === activeCategory);
  }, [projects, activeCategory]);

  const categoryLabel = (categoryId: string) =>
    categories?.find((category) => category.id === categoryId)?.label ?? categoryId;

  const heroCrumbs = [{ label: 'Inicio', to: '/' }, { label: 'Proyectos' }];

  return (
    <>
      <PageHero
        kicker="Portafolio"
        title="Proyectos que dejaron huella"
        description="Más de 480 entregas. Explora una selección representativa por sector y conoce los resultados que logramos."
        imageSrc="https://picsum.photos/seed/wb-project-6-1/1600/900"
        imageAlt="Portafolio de proyectos de Westbridge Demolition"
        crumbs={heroCrumbs}
      />

      <Section>
        {isLoading && <Loader />}
        {error && <ErrorState message={error} onRetry={retry} />}

        {projects && categories && (
          <>
            <div className="project-filters" role="tablist" aria-label="Filtrar proyectos por categoría">
              <button
                className={[
                  'project-filters__btn',
                  activeCategory === ALL_CATEGORIES && 'project-filters__btn--active',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setActiveCategory(ALL_CATEGORIES)}
                aria-pressed={activeCategory === ALL_CATEGORIES}
              >
                Todos
                <span className="project-filters__count">{projects.length}</span>
              </button>
              {categories.map((category) => {
                const count = projects.filter(
                  (project) => project.categoryId === category.id,
                ).length;
                return (
                  <button
                    key={category.id}
                    className={[
                      'project-filters__btn',
                      activeCategory === category.id && 'project-filters__btn--active',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => setActiveCategory(category.id)}
                    aria-pressed={activeCategory === category.id}
                  >
                    {category.label}
                    <span className="project-filters__count">{count}</span>
                  </button>
                );
              })}
            </div>

            {filteredProjects.length === 0 ? (
              <p className="project-filters__empty">
                No hay proyectos en esta categoría todavía.
              </p>
            ) : (
              <ul className="projects-masonry" role="list" aria-label="Proyectos por categoría">
                {filteredProjects.map((project, index) => (
                  <Reveal
                    key={project.id}
                    as="li"
                    className="projects-masonry__item"
                    delay={(index % 4) * 60}
                  >
                    <ProjectMasonryCard
                      project={project}
                      categoryLabel={categoryLabel(project.categoryId)}
                      index={index}
                    />
                  </Reveal>
                ))}
              </ul>
            )}
          </>
        )}
      </Section>

      <CtaBand
        title="Tu proyecto podría ser el próximo en esta galería"
        description="Comparte tu visión y te mostraremos exactamente cómo la haríamos realidad."
      />
    </>
  );
}
