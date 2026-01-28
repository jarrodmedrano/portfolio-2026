'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook that detects if the user prefers reduced motion
 *
 * Listens to the `prefers-reduced-motion` media query and updates when the preference changes.
 * Used to disable or reduce animations for users with motion sensitivity.
 *
 * @returns Boolean indicating if reduced motion is preferred
 *
 * @example
 * ```tsx
 * const prefersReducedMotion = useReducedMotion();
 * const duration = prefersReducedMotion ? 0.1 : 0.8;
 * ```
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
