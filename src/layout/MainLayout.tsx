/* ============================================================
   MainLayout — shared shell: skip link, header, routed page,
   footer. Handles scroll restoration on navigation.
   ============================================================ */

import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/layout/Header';
import { Footer } from '@/layout/Footer';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="site-shell">
      <ScrollProgress />
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
