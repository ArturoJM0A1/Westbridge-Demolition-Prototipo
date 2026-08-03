/* ============================================================
   Timeline — vertical milestones list (company history).
   ============================================================ */

import { memo } from 'react';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  detail: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = memo(function Timeline({ items }: TimelineProps) {
  return (
    <ol className="timeline">
      {items.map((item) => (
        <li key={item.id} className="timeline__item">
          <span className="timeline__year">{item.year}</span>
          <span className="timeline__dot" aria-hidden="true" />
          <div className="timeline__content">
            <h3 className="timeline__title">{item.title}</h3>
            <p className="timeline__detail">{item.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
});
