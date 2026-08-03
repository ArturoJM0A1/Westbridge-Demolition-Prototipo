/* ============================================================
   NotFoundPage — 404 fallback.
   ============================================================ */

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <section className="not-found">
      <Container className="not-found__inner">
        <span className="not-found__code" aria-hidden="true">
          404
        </span>
        <p className="kicker">Página no encontrada</p>
        <h1 className="not-found__title">El edificio que buscas ya no existe aquí</h1>
        <p className="not-found__text">
          La ruta solicitada no está disponible. Vuelve al inicio o revisa nuestros proyectos y
          servicios.
        </p>
        <div className="not-found__actions">
          <Button as="link" to="/" variant="primary" icon="arrow-left">
            Volver al inicio
          </Button>
          <Button as="link" to="/proyectos" variant="outline">
            Ver proyectos
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default NotFoundPage;
