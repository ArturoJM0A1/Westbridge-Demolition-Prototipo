/* ============================================================
   Home · Services — overview grid of the service lines.
   ============================================================ */

import { memo } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/ServiceCard';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';

export const ServicesSection = memo(function ServicesSection() {
  const { data: services, isLoading, error, retry } = useAsyncData(contentService.getServices);

  return (
    <Section id="servicios">
      <SectionHeading
        kicker="Lo que hacemos"
        title="Servicios de demolición integral"
        description="Una sola responsabilidad, siete especialidades. Cubrimos todo el ciclo de la demolición comercial bajo un mismo contrato y un mismo estándar."
      />

      {isLoading && <Loader fullHeight={false} />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {services && (
        <Stagger className="grid grid--3 grid--gap-md home-services__grid">
          {services.slice(0, 6).map((service, index) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
      )}

      <div className="home-services__action">
        <Button as="link" to="/servicios" variant="outline" size="lg" icon="arrow-right">
          Explorar todos los servicios
        </Button>
      </div>
    </Section>
  );
});
