/* ============================================================
   StatCounter — animated numeric stat driven by useCountUp.
   ============================================================ */

import { memo } from 'react';
import type { Statistic } from '@/types';
import { useCountUp } from '@/hooks/useCountUp';

interface StatCounterProps {
  stat: Statistic;
}

const formatWithSuffix = (value: number, suffix: string) => {
  if (suffix === 'M') return `${value}M`;
  return `${value.toLocaleString('es-US')}${suffix}`;
};

export const StatCounter = memo(function StatCounter({ stat }: StatCounterProps) {
  const { value, ref } = useCountUp<HTMLDivElement>(stat.value);

  return (
    <div ref={ref} className="stat">
      <p className="stat__value">
        {formatWithSuffix(value, stat.suffix)}
      </p>
      <p className="stat__label">{stat.label}</p>
      {stat.detail && <p className="stat__detail">{stat.detail}</p>}
    </div>
  );
});
