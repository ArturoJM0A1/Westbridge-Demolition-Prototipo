/* ============================================================
   PageHero — inner-page header with breadcrumbs + background.
   ============================================================ */

import { memo } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { SmartImage } from '@/components/ui/SmartImage';
import { Parallax } from '@/components/motion/Parallax';

interface PageHeroProps {
  kicker: string;
  title: React.ReactNode;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  crumbs: Crumb[];
}

export const PageHero = memo(function PageHero({
  kicker,
  title,
  description,
  imageSrc,
  imageAlt,
  crumbs,
}: PageHeroProps) {
  return (
    <header className="page-hero">
      <Parallax className="page-hero__media" speed={0.12}>
        <SmartImage src={imageSrc} alt={imageAlt} eager ratio="21 / 9" className="page-hero__media-img" />
      </Parallax>
      <div className="page-hero__shade" aria-hidden="true" />
      <Container className="page-hero__content">
        <Breadcrumbs items={crumbs} className="page-hero__crumbs" />
        <p className="kicker kicker--light">{kicker}</p>
        <h1 className="page-hero__title">{title}</h1>
        {description && <p className="page-hero__description">{description}</p>}
      </Container>
    </header>
  );
});
