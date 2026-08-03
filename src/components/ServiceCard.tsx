/* ============================================================
   ServiceCard — independent, fully configurable service card.
   ============================================================ */

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { SmartImage } from '@/components/ui/SmartImage';
import { IconTile } from '@/components/IconTile';
import { Icon, type IconName } from '@/components/ui/Icon';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export const ServiceCard = memo(function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  return (
    <Card as="article" className="service-card" interactive>
      <Link to={`/servicios/${service.slug}`} className="service-card__link">
        <div className="service-card__media">
          <SmartImage
            src={service.image.src}
            alt={service.image.alt}
            ratio="16 / 9"
          />
          <span className="service-card__index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="service-card__body">
          <IconTile icon={service.icon as IconName} tone="accent" />
          <h3 className="service-card__title">{service.title}</h3>
          <p className="service-card__description">{service.shortDescription}</p>
          <span className="service-card__cta">
            Ver servicio
            <Icon name="arrow-right" size={16} />
          </span>
        </div>
      </Link>
    </Card>
  );
});
