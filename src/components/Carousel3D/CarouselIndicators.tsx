'use client';

import styles from './CarouselIndicators.module.css';

interface CarouselIndicatorsProps {
  totalItems: number;
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export default function CarouselIndicators({
  totalItems,
  activeIndex,
  onNavigate,
}: CarouselIndicatorsProps) {
  return (
    <div className={styles.indicators} role="tablist" aria-label="Carousel navigation">
      {Array.from({ length: totalItems }, (_, index) => index).map((index) => (
        <button
          key={`indicator-${index}`}
          type="button"
          className={`${styles.dot} ${index === activeIndex ? styles['dot--active'] : ''}`}
          onClick={() => onNavigate(index)}
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`Project ${index + 1}`}
        />
      ))}
    </div>
  );
}
