'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { CarouselItem, CardTransform } from '@/types/carousel';
import styles from './CardContent.module.css';

interface CardContentProps {
  item: CarouselItem;
  transform: CardTransform;
  cardHeight: number;
}

function CardContent({
  item,
  transform,
  cardHeight,
}: CardContentProps) {
  // Only show content for visible cards (not too far away)
  const isVisible = Math.abs(transform.rotateY) <= 144;

  if (!isVisible || item.type !== 'project') {
    return null;
  }

  // Position below the card
  const topPosition = cardHeight / 2 + 24; // 24px gap

  return (
    <motion.div
      className={`${styles.content} ${!isVisible ? styles['content--hidden'] : ''}`}
      style={{ top: topPosition }}
      animate={{ opacity: isVisible ? transform.opacity : 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.techStack}>
        {item.techStack.slice(0, 3).join(' • ')}
      </p>
      {item.projectUrl && (
        <a
          href={item.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          tabIndex={transform.isGoldenRect ? 0 : -1}
        >
          View Project →
        </a>
      )}
    </motion.div>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(CardContent);
