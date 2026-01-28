/**
 * Type of carousel item
 */
export type CarouselItemType = 'project' | 'cta';

/**
 * Base interface for all carousel items
 */
export interface BaseCarouselItem {
  /** Unique identifier for the item */
  id: string;
  /** Type of carousel item */
  type: CarouselItemType;
}

/**
 * Project carousel item with image and details
 */
export interface ProjectCarouselItem extends BaseCarouselItem {
  type: 'project';
  /** Project title */
  title: string;
  /** URL to project thumbnail image */
  imageUrl: string;
  /** Array of technologies used in the project */
  techStack: string[];
  /** Optional URL to view the project */
  projectUrl?: string;
}

/**
 * Call-to-action carousel item
 */
export interface CTACarouselItem extends BaseCarouselItem {
  type: 'cta';
  /** CTA card title */
  ctaTitle: string;
  /** CTA button text */
  ctaText: string;
  /** CTA destination URL */
  ctaLink: string;
}

/**
 * Union type of all carousel item types
 */
export type CarouselItem = ProjectCarouselItem | CTACarouselItem;

/**
 * 3D transform properties for positioning a card in the carousel
 */
export interface CardTransform {
  /** Y-axis rotation in degrees (0-360) */
  rotateY: number;
  /** Scale factor (0-1) */
  scale: number;
  /** Opacity (0-1) */
  opacity: number;
  /** CSS z-index for layering */
  zIndex: number;
  /** Z-axis translation for depth */
  translateZ: number;
  /** Whether the card should be displayed as golden rectangle */
  isGoldenRect: boolean;
}
