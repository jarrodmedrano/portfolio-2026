/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import {
  useState, useEffect, useCallback, useRef,
} from 'react';
import type { CarouselItem } from '@/types/carousel';
import { getCardTransform } from './utils';
import CarouselCard from './CarouselCard';
import styles from './Carousel3D.module.css';

interface Carousel3DProps {
  items: CarouselItem[];
  autoPlayInterval?: number;
}

export default function Carousel3D({
  items,
  autoPlayInterval = 5000,
}: Carousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPausedByHover, setIsPausedByHover] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    >
      <div className={styles.stage}>
        {items.map((item, index) => {
          const transform = getCardTransform(index, activeIndex, items.length);
          return (
            <CarouselCard
              key={item.id}
              item={item}
              transform={transform}
              isActive={transform.isGoldenRect}
            />
          );
        })}
      </div>
    </div>
  );
}
