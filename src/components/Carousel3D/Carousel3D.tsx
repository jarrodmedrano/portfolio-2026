'use client';

import {
  useState, useEffect, useCallback, useRef, useMemo,
} from 'react';
import { motion } from 'framer-motion';
import type { CarouselItem } from '@/types/carousel';
import { getCardTransform } from './utils';
import { useAccessibility } from './useAccessibility';
import { useReducedMotion } from './useReducedMotion';
import CarouselCard from './CarouselCard';
import CarouselControls from './CarouselControls';
import CarouselIndicators from './CarouselIndicators';
import styles from './Carousel3D.module.css';

/**
 * Props for the Carousel3D component
 */
interface Carousel3DProps {
  /** Array of carousel items (projects or CTA cards) */
  items: CarouselItem[];
  /** Auto-rotation interval in milliseconds (default: 5000ms) */
  autoPlayInterval?: number;
}

/**
 * 3D horizontal carousel component with golden rectangle active state
 *
 * Features:
 * - 3D rotation with 72° spacing between cards
 * - Golden rectangle morph (720×445px active, 400×400px inactive)
 * - Auto-rotation with pause-on-hover
 * - Full keyboard navigation (arrows, space, home/end)
 * - Touch swipe support
 * - Screen reader announcements
 * - Reduced motion support
 * - Responsive design (mobile/tablet/desktop)
 *
 * @example
 * ```tsx
 * <Carousel3D items={carouselItems} autoPlayInterval={5000} />
 * ```
 */
export default function Carousel3D({
  items,
  autoPlayInterval = 5000,
}: Carousel3DProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(!prefersReducedMotion);
  const [isPausedByHover, setIsPausedByHover] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { announcement } = useAccessibility({ activeIndex, items });

  const navigateNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const navigatePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const navigateToIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsPausedByHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPausedByHover(false);
  }, []);

  const handleDragEnd = useCallback((
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } },
  ) => {
    const { offset, velocity } = info;
    const swipeThreshold = 50;
    const velocityThreshold = 500;

    if (
      Math.abs(offset.x) > swipeThreshold
      || Math.abs(velocity.x) > velocityThreshold
    ) {
      if (offset.x > 0) {
        navigatePrev();
      } else {
        navigateNext();
      }
    }
  }, [navigateNext, navigatePrev]);

  // Memoize transform calculations to prevent recalculating on every render
  const cardTransforms = useMemo(
    () => items.map((_, index) => getCardTransform(index, activeIndex, items.length)),
    [activeIndex, items],
  );

  useEffect(() => {
    if (!isAutoPlaying || isPausedByHover) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return undefined;
    }

    intervalRef.current = setInterval(() => {
      navigateNext();
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isPausedByHover, autoPlayInterval, navigateNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          navigatePrev();
          break;
        case 'ArrowRight':
          navigateNext();
          break;
        case ' ':
          e.preventDefault();
          toggleAutoPlay();
          break;
        case 'Home':
          navigateToIndex(0);
          break;
        case 'End':
          navigateToIndex(items.length - 1);
          break;
        default:
          // No action for other keys
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items.length, activeIndex, navigateNext, navigatePrev, navigateToIndex, toggleAutoPlay]);

  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Featured Projects Carousel"
      aria-roledescription="carousel"
    >
      {/* Live region for announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className={styles.srOnly}
      >
        {announcement}
      </div>

      <motion.div
        className={styles.stage}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        {items.map((item, index) => {
          const transform = cardTransforms[index];
          return (
            <CarouselCard
              key={item.id}
              item={item}
              transform={transform}
              isActive={transform.isGoldenRect}
              reducedMotion={prefersReducedMotion}
            />
          );
        })}
      </motion.div>
      <CarouselControls
        onPrev={navigatePrev}
        onNext={navigateNext}
        onToggleAutoPlay={toggleAutoPlay}
        isAutoPlaying={isAutoPlaying}
      />
      <CarouselIndicators
        totalItems={items.length}
        activeIndex={activeIndex}
        onNavigate={navigateToIndex}
      />
    </div>
  );
}
