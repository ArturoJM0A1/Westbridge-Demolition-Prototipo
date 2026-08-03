/* ============================================================
   Home · Advantages — Why Westbridge preview split section.
   ============================================================ */

import { memo } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';
import { IconTile } from '@/components/IconTile';
import { type IconName } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';

export const AdvantagesSection = memo(function AdvantagesSection() {
  const { data: advantages, isLoading, error, retry } = useAsyncData(contentService.getAdvantages);

  return (
    <Section variant="alt">
      <div className="split">
        <div className="split__media">
          <Reveal>
            <SmartImage
              src="https://picsum.photos/seed/wb-about-operations/1600/900"
              alt="Operación de demolición con excavadora de alto alcance"
              ratio="4 / 5"
              className="split__image"
            />
          </Reveal>
          <div className="split__chip" aria-hidden="true">
            <span className="split__chip-number">98%</span>
            <span className="split__chip-label">entregas a tiempo</span>
          </div>
        </div>

        <div className="split__content">
          <SectionHeading
            kicker="Por qué Westbridge"
            title="El contratista que eligen los desarrolladores del sur de Florida"
            description="No competimos por precio: competimos por el costo total del proyecto. Menos interrupciones, menos riesgos, menos escombros al vertedero."
          />

          {isLoading && <Loader fullHeight={false} />}
          {error && <ErrorState message={error} onRetry={retry} />}
          {advantages && (
            <Stagger className="advantage-list">
              {advantages.map((advantage) => (
                <StaggerItem className="advantage-item" key={advantage.id}>
                  <IconTile icon={advantage.icon as IconName} tone="accent" />
                  <div className="advantage-item__body">
                    <h3 className="advantage-item__title">{advantage.title}</h3>
                    <p className="advantage-item__description">{advantage.description}</p>
                  </div>
                  <div className="advantage-item__stat">
                    <span>{advantage.stat.value}</span>
                    <small>{advantage.stat.label}</small>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          <div className="split__action">
            <Button as="link" to="/por-que-westbridge" variant="outline" icon="arrow-right">
              Descubre todas las razones
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
});
