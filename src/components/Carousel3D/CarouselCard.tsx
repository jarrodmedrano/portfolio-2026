'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { CarouselItem, CardTransform } from '@/types/carousel';
import CardContent from './CardContent';
import { useResponsive } from './useResponsive';
import { CARD_DIMENSIONS, GOLDEN_RATIO } from './constants';
import styles from './CarouselCard.module.css';

interface CarouselCardProps {
  item: CarouselItem;
  transform: CardTransform;
  isActive: boolean;
  reducedMotion?: boolean;
}

export default function CarouselCard({
  item,
  transform,
  isActive,
  reducedMotion = false,
}: CarouselCardProps) {
  const breakpoint = useResponsive();

  // Calculate dimensions based on breakpoint
  let width: number;
  let height: number;

  if (transform.isGoldenRect) {
    // Golden rectangle dimensions
    if (breakpoint === 'mobile') {
      const { maxWidth, widthPercent } = CARD_DIMENSIONS.mobile.active;
      width = Math.min(
        typeof window !== 'undefined' ? window.innerWidth * widthPercent : maxWidth,
        maxWidth,
      );
      height = width / GOLDEN_RATIO;
    } else if (breakpoint === 'tablet') {
      width = CARD_DIMENSIONS.tablet.active.width;
      height = CARD_DIMENSIONS.tablet.active.height;
    } else {
      width = CARD_DIMENSIONS.desktop.active.width;
      height = CARD_DIMENSIONS.desktop.active.height;
    }
  } else if (breakpoint === 'mobile') {
    // Square dimensions - Mobile
    width = CARD_DIMENSIONS.mobile.inactive.width;
    height = CARD_DIMENSIONS.mobile.inactive.height;
  } else if (breakpoint === 'tablet') {
    // Square dimensions - Tablet
    width = CARD_DIMENSIONS.tablet.inactive.width;
    height = CARD_DIMENSIONS.tablet.inactive.height;
  } else {
    // Square dimensions - Desktop
    width = CARD_DIMENSIONS.desktop.inactive.width;
    height = CARD_DIMENSIONS.desktop.inactive.height;
  }

  return (
    <>
      <motion.div
        className={styles.card}
        animate={{
          rotateY: transform.rotateY,
          scale: transform.scale,
          opacity: transform.opacity,
          translateZ: transform.translateZ,
          x: '-50%',
          y: '-50%',
          width,
          height,
        }}
        transition={{
          duration: reducedMotion ? 0.1 : 0.8,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          zIndex: transform.zIndex,
        }}
      >
        <div
          className={`${styles.cardInner} ${!isActive ? styles['cardInner--inactive'] : ''}`}
          style={{ width, height }}
        >
          {item.type === 'project' ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={800}
              height={450}
              className={styles.cardImage}
            />
          ) : (
            <div
              className={`${styles.ctaCard} ${isActive ? styles['ctaCard--active'] : ''}`}
            >
              <h3 className={styles.ctaTitle}>{item.ctaTitle}</h3>
              <a href={item.ctaLink} className={styles.ctaText}>
                {item.ctaText}
              </a>
            </div>
          )}
        </div>
      </motion.div>
      <CardContent item={item} transform={transform} cardHeight={height} />
    </>
  );
}
