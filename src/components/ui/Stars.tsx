/* ============================================================
   Stars — visual rating indicator.
   ============================================================ */

import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';

interface StarsProps {
  rating: number;
  max?: number;
  size?: number;
}

export const Stars = memo(function Stars({ rating, max = 5, size = 16 }: StarsProps) {
  return (
    <div className="stars" role="img" aria-label={`Calificación ${rating} de ${max}`}>
      {Array.from({ length: max }, (_, index) => (
        <Icon
          key={index}
          name="star"
          size={size}
          className={index < rating ? 'stars__star stars__star--on' : 'stars__star'}
        />
      ))}
    </div>
  );
});
