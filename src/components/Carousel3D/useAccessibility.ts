'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Props for the useAccessibility hook
 */
interface UseAccessibilityProps {
  /** Current active carousel index */
  activeIndex: number;
  /** Array of carousel items */
  items: Array<{ id: string; type: string; title?: string; ctaTitle?: string }>;
}

/**
 * Custom hook for managing accessibility announcements in the carousel
 *
 * Provides screen reader announcements when the active card changes.
 * Debounces announcements by 500ms to prevent spam during rapid navigation.
 *
 * @param props - Hook configuration
 * @returns Object containing the current announcement string for ARIA live region
 *
 * @example
 * ```tsx
 * const { announcement } = useAccessibility({ activeIndex, items });
 * <div aria-live="polite">{announcement}</div>
 * ```
 */
export function useAccessibility({ activeIndex, items }: UseAccessibilityProps) {
  const [announcement, setAnnouncement] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Delay announcement to avoid spam during rapid navigation
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const item = items[activeIndex];
      const itemTitle = item.type === 'project' ? item.title : item.ctaTitle;
      setAnnouncement(
        `Now showing: ${itemTitle}, ${activeIndex + 1} of ${items.length}`,
      );
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex, items]);

  return { announcement };
}
