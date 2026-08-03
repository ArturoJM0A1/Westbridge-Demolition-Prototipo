/* ============================================================
   HomePage — corporate landing page.
   ============================================================ */

import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { AdvantagesSection } from '@/components/home/AdvantagesSection';
import { FeaturedProjectsSection } from '@/components/home/FeaturedProjectsSection';
import { CertificationsStrip } from '@/components/home/CertificationsStrip';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ContactPreviewSection } from '@/components/home/ContactPreviewSection';
import { CtaBand } from '@/components/ui/CtaBand';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AdvantagesSection />
      <FeaturedProjectsSection />
      <CertificationsStrip />
      <TestimonialsSection />
      <CtaBand />
      <ContactPreviewSection />
    </>
  );
}
