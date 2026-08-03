/* ============================================================
   AppRoutes — route table with React.lazy code splitting and
   native View Transitions between pages (graceful fallback).
   ============================================================ */

import { lazy, Suspense, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MainLayout } from '@/layout/MainLayout';
import { Loader } from '@/components/ui/Loader';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'));
const WhyWestbridgePage = lazy(() => import('@/pages/WhyWestbridgePage'));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'));
const SafetyPage = lazy(() => import('@/pages/SafetyPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

interface ViewTransition {
  finished: Promise<void>;
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ViewTransition;
};

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Defer the location swap so the browser can snapshot + crossfade. */
function applyWithViewTransition(update: () => void) {
  const doc = document as ViewTransitionDocument;
  if (typeof doc.startViewTransition === 'function' && !prefersReducedMotion()) {
    doc.startViewTransition(update);
  } else {
    update();
  }
}

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.key === displayLocation.key) return;

    applyWithViewTransition(() => {
      flushSync(() => setDisplayLocation(location));
    });
  }, [location, displayLocation]);

  return (
    <Routes location={displayLocation}>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="nosotros" element={<AboutPage />} />
        <Route path="servicios" element={<ServicesPage />} />
        <Route path="servicios/:slug" element={<ServiceDetailPage />} />
        <Route path="por-que-westbridge" element={<WhyWestbridgePage />} />
        <Route path="proyectos" element={<ProjectsPage />} />
        <Route path="proyectos/:slug" element={<ProjectDetailPage />} />
        <Route path="seguridad" element={<SafetyPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <AnimatedRoutes />
    </Suspense>
  );
}
