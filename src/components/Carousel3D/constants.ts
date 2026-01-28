/**
 * Responsive dimension constants for Carousel3D cards
 *
 * Active cards use golden rectangle ratio (1.618:1)
 * Inactive cards are squares
 */

export const CARD_DIMENSIONS = {
  desktop: {
    active: {
      width: 720,
      height: 445,
    },
    inactive: {
      width: 400,
      height: 400,
    },
  },
  tablet: {
    active: {
      width: 600,
      height: 371,
    },
    inactive: {
      width: 320,
      height: 320,
    },
  },
  mobile: {
    active: {
      maxWidth: 500,
      widthPercent: 0.9, // 90% of viewport width
      // Height calculated dynamically: width / 1.618
    },
    inactive: {
      width: 280,
      height: 280,
    },
  },
} as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

export const GOLDEN_RATIO = 1.618;
