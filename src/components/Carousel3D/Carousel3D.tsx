/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import {
  useState, useEffect, useCallback, useRef,
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

interface Carousel3DProps {
  items: CarouselItem[];
  autoPlayInterval?: number;
}

export default function Carousel3D({
  items,
  autoPlayInterval = 5000,
}: Carousel3DProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(!prefersReducedMotion);
  const [isPausedByHover, setIsPausedByHover] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { announcement } = useAccessibility({ activeIndex, items });

  const navigateNext = useCallback(() => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const navigatePrev = useCallback(() => {
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const navigateToIndex = useCallback((index: number) => {
    setDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);
  }, [activeIndex]);

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
          const transform = getCardTransform(index, activeIndex, items.length);
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
