'use client';

import { useEffect, useState } from 'react';

/**
 * Responsive breakpoint type
 * - mobile: < 768px
 * - tablet: 768px - 1023px
 * - desktop: >= 1024px
 */
type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Custom hook for detecting the current responsive breakpoint
 *
 * Listens to window resize events and returns the current breakpoint.
 * Used to adjust carousel card dimensions based on screen size.
 *
 * @returns Current breakpoint ('mobile' | 'tablet' | 'desktop')
 *
 * @example
 * ```tsx
 * const breakpoint = useResponsive();
 * const width = breakpoint === 'mobile' ? 280 : 400;
 * ```
 */
export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}
