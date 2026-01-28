export type CarouselItemType = 'project' | 'cta';

export interface BaseCarouselItem {
  id: string;
  type: CarouselItemType;
}

export interface ProjectCarouselItem extends BaseCarouselItem {
  type: 'project';
  title: string;
  imageUrl: string;
  techStack: string[];
  projectUrl?: string;
}

export interface CTACarouselItem extends BaseCarouselItem {
  type: 'cta';
  ctaTitle: string;
  ctaText: string;
  ctaLink: string;
}

export type CarouselItem = ProjectCarouselItem | CTACarouselItem;

export interface CardTransform {
  rotateY: number;
  scale: number;
  opacity: number;
  zIndex: number;
  translateZ: number;
  isGoldenRect: boolean;
}
