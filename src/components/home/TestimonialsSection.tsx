/* ============================================================
   Home · Testimonials — client voices.
   ============================================================ */

import { memo } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Grid } from '@/components/ui/Grid';
import { TestimonialCard } from '@/components/TestimonialCard';
import { Reveal } from '@/components/ui/Reveal';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';

export const TestimonialsSection = memo(function TestimonialsSection() {
  const { data: testimonials, isLoading, error, retry } = useAsyncData(contentService.getTestimonials);

  return (
    <Section>
      <SectionHeading
        kicker="Clientes"
        title="Lo que dicen quienes construyen con nosotros"
        align="center"
      />

      {isLoading && <Loader fullHeight={false} />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {testimonials && (
        <Grid cols={2}>
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={(index % 2) * 90}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </Grid>
      )}
    </Section>
  );
});
