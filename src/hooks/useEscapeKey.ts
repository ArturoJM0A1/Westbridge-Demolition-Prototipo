/* ============================================================
   useEscapeKey — closes overlays when Escape is pressed.
   ============================================================ */

import { useEffect } from 'react';

export function useEscapeKey(handler: () => void, active = true) {
  useEffect(() => {
    if (!active) return;
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handler();
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [handler, active]);
}
