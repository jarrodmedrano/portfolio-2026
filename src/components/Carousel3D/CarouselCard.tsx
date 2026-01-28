'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { CarouselItem, CardTransform } from '@/types/carousel';
import CardContent from './CardContent';
import styles from './CarouselCard.module.css';

interface CarouselCardProps {
  item: CarouselItem;
  transform: CardTransform;
  isActive: boolean;
}

export default function CarouselCard({
  item,
  transform,
  isActive,
}: CarouselCardProps) {
  const width = transform.isGoldenRect ? 720 : 400;
  const height = transform.isGoldenRect ? 445 : 400;

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
          duration: 0.8,
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
