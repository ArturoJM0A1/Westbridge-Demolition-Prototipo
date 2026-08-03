/* ============================================================
   useCountUp — animates a number from 0 to target when the
   element scrolls into view (drives the stats counters).
   ============================================================ */

import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  durationMs?: number;
  startOnView?: boolean;
}

export function useCountUp<T extends HTMLElement = HTMLElement>(
  target: number,
  options: UseCountUpOptions = {},
) {
  const { durationMs = 1600, startOnView = true } = options;
  const [value, setValue] = useState(0);
  const elementRef = useRef<T | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      if (prefersReducedMotion) {
        setValue(target);
        return;
      }

      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!startOnView) {
      run();
      return;
    }

    const node = elementRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, durationMs, startOnView]);

  return { value, ref: elementRef };
}
