/* ============================================================
   Home · Certifications strip — credential marquee.
   ============================================================ */

import { memo } from 'react';
import { Container } from '@/components/ui/Container';
import { useAsyncData } from '@/hooks/useAsyncData';
import { contentService } from '@/services/content.service';

export const CertificationsStrip = memo(function CertificationsStrip() {
  const { data: certifications } = useAsyncData(contentService.getCertifications);

  if (!certifications) return null;

  const items = [...certifications, ...certifications];

  return (
    <section className="certifications-strip" aria-label="Certificaciones y licencias">
      <Container>
        <p className="certifications-strip__label">Certificaciones · Licencias · Estándares</p>
      </Container>
      <div className="certifications-strip__marquee" aria-hidden="true">
        <div className="certifications-strip__track">
          {items.map((cert, index) => (
            <span className="certifications-strip__item" key={`${cert.id}-${index}`}>
              {cert.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});
