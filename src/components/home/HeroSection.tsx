/* ============================================================
   Home · Hero — full-bleed opening statement.
   ============================================================ */

import { memo } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SmartImage } from '@/components/ui/SmartImage';
import { Icon } from '@/components/ui/Icon';
import { Parallax } from '@/components/motion/Parallax';
import { SITE } from '@/constants/site';

const HERO_POINTS = ['Ingeniería de demolición', 'Seguridad certificada', '91% de reciclaje'];

export const HeroSection = memo(function HeroSection() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <Parallax className="home-hero__media" speed={0.16}>
        <SmartImage
          src="https://picsum.photos/seed/wb-hero-home/1920/1080"
          alt="Maquinaria de demolición de Westbridge en obra"
          eager
          className="home-hero__media-img"
        />
      </Parallax>
      <div className="home-hero__shade" aria-hidden="true" />
      <div className="home-hero__scanline" aria-hidden="true" />

      <Container className="home-hero__content">
        <div className="home-hero__intro">
          <p className="kicker kicker--light animate-enter">Demolición comercial · Sur de Florida</p>
          <h1 id="home-hero-title" className="home-hero__title animate-enter">
            Construimos futuro <br />
            <span className="text-accent">desde la demolición</span>
          </h1>
          <p className="home-hero__lead animate-enter">
            {SITE.yearsOfExperience} años transformando el paisaje comercial del sur de Florida con
            ingeniería, precisión y un compromiso inquebrantable con la seguridad.
          </p>

          <div className="home-hero__actions animate-enter">
            <Button as="link" to="/contacto" variant="accent" size="lg" icon="arrow-right">
              Solicitar estimado gratis
            </Button>
            <Button as="link" to="/proyectos" variant="outline-light" size="lg">
              Ver proyectos
            </Button>
          </div>

          <ul className="home-hero__points animate-enter">
            {HERO_POINTS.map((point) => (
              <li key={point}>
                <Icon name="check" size={16} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <figure className="home-hero__figure animate-enter" aria-hidden="true">
          <img
            src="/images/trabajador.png"
            alt=""
            width="327"
            height="559"
            loading="eager"
            decoding="async"
          />
        </figure>
      </Container>

      <div className="home-hero__ticker" aria-hidden="true">
        <div className="home-hero__ticker-track">
          {[0, 1].map((set) => (
            <div className="home-hero__ticker-group" key={set}>
              <span>Miami</span>
              <span className="tick-sep">◆</span>
              <span>Fort Lauderdale</span>
              <span className="tick-sep">◆</span>
              <span>West Palm Beach</span>
              <span className="tick-sep">◆</span>
              <span>Doral</span>
              <span className="tick-sep">◆</span>
              <span>Coral Gables</span>
              <span className="tick-sep">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
