/* ============================================================
   CtaBand — reusable call-to-action band used across pages.
   ============================================================ */

import { memo } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { CONTACT } from '@/constants/site';

interface CtaBandProps {
  title?: string;
  description?: string;
  className?: string;
}

const DEFAULT_TITLE = '¿Listo para transformar tu sitio?';
const DEFAULT_DESCRIPTION =
  'Solicita un estimado gratuito. Respondemos con un plan de demolición claro en un máximo de 48 horas.';

export const CtaBand = memo(function CtaBand({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  className = '',
}: CtaBandProps) {
  return (
    <section className={['cta-band', className].filter(Boolean).join(' ')}>
      <div className="cta-band__overlay" aria-hidden="true" />
      <Container className="cta-band__container">
        <div className="cta-band__content">
          <p className="kicker kicker--light">Trabajemos juntos</p>
          <h2 className="cta-band__title">{title}</h2>
          <p className="cta-band__description">{description}</p>
        </div>
        <div className="cta-band__actions">
          <Button as="link" to="/contacto" variant="accent" size="lg" icon="arrow-right">
            Solicitar estimado
          </Button>
          <Button as="a" href={CONTACT.phoneHref} variant="outline-light" size="lg" icon="phone">
            {CONTACT.phone}
          </Button>
        </div>
      </Container>
    </section>
  );
});
