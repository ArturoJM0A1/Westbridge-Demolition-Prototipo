/* ============================================================
   ProjectMasonryCard — Pinterest-style tile for the portfolio.
   Media height varies per position (ratio cycle) so the
   masonry column flow feels organic without JS layout math.
   ============================================================ */

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { SmartImage } from '@/components/ui/SmartImage';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import type { Project } from '@/types';

const MEDIA_RATIOS = ['16 / 9', '4 / 5', '1 / 1', '4 / 3', '16 / 10', '3 / 4'];

interface ProjectMasonryCardProps {
  project: Project;
  categoryLabel: string;
  /** Position in the current filtered list; drives the media ratio */
  index: number;
}

export const ProjectMasonryCard = memo(function ProjectMasonryCard({
  project,
  categoryLabel,
  index,
}: ProjectMasonryCardProps) {
  const ratio = MEDIA_RATIOS[index % MEDIA_RATIOS.length];

  return (
    <Card as="article" className="project-card project-card--masonry" interactive padding="none">
      <Link to={`/proyectos/${project.slug}`} className="project-card__link">
        <div className="project-card__media">
          <SmartImage src={project.image.src} alt={project.image.alt} ratio={ratio} />
          <Badge tone="accent" className="project-card__badge">
            {categoryLabel}
          </Badge>
        </div>
        <div className="project-card__body">
          <p className="project-card__meta">
            {project.location} · {project.year}
          </p>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__summary">{project.summary}</p>
          <span className="project-card__cta">
            Ver proyecto
            <Icon name="arrow-up-right" size={16} />
          </span>
        </div>
      </Link>
    </Card>
  );
});
