/* ============================================================
   useOnClickOutside — invokes a callback when a click lands
   outside the referenced element(s). Accepts elements to ignore.
   ============================================================ */

import { useEffect, type RefObject } from 'react';

export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
  active = true,
  ignore?: RefObject<HTMLElement>[],
) {
  useEffect(() => {
    if (!active) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const node = ref.current;
      if (!node) return;
      if (node.contains(target)) return;

      if (ignore?.some((ignoreRef) => ignoreRef.current?.contains(target))) return;

      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, active, ignore]);
}
