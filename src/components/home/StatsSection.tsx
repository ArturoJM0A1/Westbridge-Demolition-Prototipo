/* ============================================================
   Home · Stats — animated company statistics band.
   ============================================================ */

import { memo } from 'react';
import { Container } from '@/components/ui/Container';
import { StatCounter } from '@/components/ui/StatCounter';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';

export const StatsSection = memo(function StatsSection() {
  const { data: stats, isLoading, error, retry } = useAsyncData(contentService.getStats);

  return (
    <section className="home-stats section--inverse-2" aria-label="Estadísticas de la empresa">
      <Container>
        {isLoading && <Loader fullHeight={false} />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {stats && (
          <div className="home-stats__grid">
            {stats.map((stat) => (
              <StatCounter key={stat.id} stat={stat} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
});
