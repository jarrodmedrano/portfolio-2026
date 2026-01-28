'use client';

import styles from './CarouselIndicators.module.css';

/**
 * Props for the CarouselIndicators component
 */
interface CarouselIndicatorsProps {
  /** Total number of carousel items */
  totalItems: number;
  /** Index of the currently active item */
  activeIndex: number;
  /** Callback to navigate to a specific index */
  onNavigate: (index: number) => void;
}

/**
 * Progress indicator dots for the carousel
 *
 * Displays a row of clickable dots below the carousel.
 * The active dot is filled, inactive dots are outlined.
 * Provides quick navigation to any card.
 */
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
