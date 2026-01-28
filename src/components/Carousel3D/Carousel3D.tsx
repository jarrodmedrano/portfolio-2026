/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const [direction, setDirection] = useState<'left' | 'right'>('right');

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
    <div className={styles.container}>
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
