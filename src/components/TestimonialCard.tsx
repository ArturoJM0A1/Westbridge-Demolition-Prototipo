/* ============================================================
   TestimonialCard — quote card with author + rating.
   ============================================================ */

import { memo } from 'react';
import { Card } from '@/components/ui/Card';
import { Stars } from '@/components/ui/Stars';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = memo(function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <Card as="article" className="testimonial-card">
      <span className="testimonial-card__mark" aria-hidden="true">
        &ldquo;
      </span>
      <Stars rating={testimonial.rating} />
      <blockquote className="testimonial-card__quote">{testimonial.quote}</blockquote>
      <footer className="testimonial-card__footer">
        <span className="testimonial-card__avatar" aria-hidden="true">
          {testimonial.author
            .split(' ')
            .map((part) => part[0])
            .slice(0, 2)
            .join('')}
        </span>
        <div>
          <p className="testimonial-card__author">{testimonial.author}</p>
          <p className="testimonial-card__role">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </footer>
    </Card>
  );
});
