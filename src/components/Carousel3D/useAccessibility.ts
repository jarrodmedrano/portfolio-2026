'use client';

import { useEffect, useState, useRef } from 'react';

interface UseAccessibilityProps {
  activeIndex: number;
  items: Array<{ id: string; type: string; title?: string; ctaTitle?: string }>;
}

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
