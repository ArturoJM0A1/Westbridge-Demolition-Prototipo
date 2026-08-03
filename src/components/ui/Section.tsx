/* ============================================================
   Section — consistent vertical rhythm with optional header.
   ============================================================ */

import { memo } from 'react';
import { Container } from '@/components/ui/Container';

type SectionVariant = 'default' | 'alt' | 'inverse' | 'inverse-2';

interface SectionProps {
  children: React.ReactNode;
  variant?: SectionVariant;
  className?: string;
  id?: string;
  'aria-labelledby'?: string;
  /** Removes the inner container padding edge */
  fluid?: boolean;
}

export const Section = memo(function Section({
  children,
  variant = 'default',
  className = '',
  id,
  fluid = false,
  ...rest
}: SectionProps) {
  const classNames = ['section', variant !== 'default' && `section--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={classNames} {...rest}>
      <Container fluid={fluid}>{children}</Container>
    </section>
  );
});
