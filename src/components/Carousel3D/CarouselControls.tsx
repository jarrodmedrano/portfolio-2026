'use client';

import styles from './CarouselControls.module.css';

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onToggleAutoPlay: () => void;
  isAutoPlaying: boolean;
}

export default function CarouselControls({
  onPrev,
  onNext,
  onToggleAutoPlay,
  isAutoPlaying,
}: CarouselControlsProps) {
  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={`${styles.button} ${styles.buttonLeft}`}
        onClick={onPrev}
        aria-label="Previous project"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        className={`${styles.button} ${styles.buttonRight}`}
        onClick={onNext}
        aria-label="Next project"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        className={styles.pauseButton}
        onClick={onToggleAutoPlay}
        aria-label={isAutoPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
        aria-pressed={!isAutoPlaying}
      >
        {isAutoPlaying ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3h2v10H5zM9 3h2v10H9z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3l8 5-8 5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
