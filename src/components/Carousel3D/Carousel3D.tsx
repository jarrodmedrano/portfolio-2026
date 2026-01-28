/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState } from 'react';
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
