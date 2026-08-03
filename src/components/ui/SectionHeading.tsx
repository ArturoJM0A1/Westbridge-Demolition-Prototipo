/* ============================================================
   SectionHeading — kicker + title + description block.
   The backbone of the site's editorial hierarchy.
   ============================================================ */

import { memo } from 'react';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
}

export const SectionHeading = memo(function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className = '',
  titleAs: Tag = 'h2',
}: SectionHeadingProps) {
  const classes = [
    'section-heading',
    `section-heading--${align}`,
    `section-heading--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {kicker && (
        <p className={`kicker ${tone === 'light' ? 'kicker--light' : ''}`}>{kicker}</p>
      )}
      <Tag className="section-heading__title">{title}</Tag>
      {description && <p className="section-heading__description">{description}</p>}
    </div>
  );
});
