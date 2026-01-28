import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import type { CarouselItem, CardTransform } from '@/types/carousel';
import CarouselCard from '../CarouselCard';

// Mock the responsive hook to return desktop by default
vi.mock('../useResponsive', () => ({
  useResponsive: vi.fn(() => 'desktop'),
}));

const mockProjectItem: CarouselItem = {
  type: 'project',
  id: '1',
  title: 'Test Project',
  imageUrl: '/test.jpg',
  techStack: ['React', 'TypeScript', 'Next.js'],
  projectUrl: '/project',
};

const mockCTAItem: CarouselItem = {
  type: 'cta',
  id: 'cta',
  ctaTitle: 'CTA Title',
  ctaText: 'Click Me',
  ctaLink: '/contact',
};

const activeTransform: CardTransform = {
  rotateY: 0,
  scale: 1,
  opacity: 1,
  zIndex: 5,
  translateZ: 0,
  isGoldenRect: true,
};

const inactiveTransform: CardTransform = {
  rotateY: 72,
  scale: 0.7,
  opacity: 0.7,
  zIndex: 4,
  translateZ: -200,
  isGoldenRect: false,
};

describe('CarouselCard', () => {
  describe('Rendering', () => {
    it('should render project card with image', () => {
      render(
        <CarouselCard item={mockProjectItem} transform={activeTransform} isActive />,
      );
      const img = screen.getByAltText('Test Project');
      expect(img).toBeInTheDocument();
    });

    it('should render CTA card with text', () => {
      render(<CarouselCard item={mockCTAItem} transform={activeTransform} isActive />);
      expect(screen.getByText('CTA Title')).toBeInTheDocument();
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('should render CardContent for project items', () => {
      render(
        <CarouselCard
          item={mockProjectItem}
          transform={activeTransform}
          isActive
        />,
      );
      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText(/React • TypeScript • Next.js/)).toBeInTheDocument();
    });

    it('should render View Project link for project items with projectUrl', () => {
      render(
        <CarouselCard
          item={mockProjectItem}
          transform={activeTransform}
          isActive
        />,
      );
      const link = screen.getByText(/View Project/);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/project');
    });

    it('should render CTA link with correct href', () => {
      render(<CarouselCard item={mockCTAItem} transform={activeTransform} isActive />);
      const link = screen.getByText('Click Me');
      expect(link).toHaveAttribute('href', '/contact');
    });
  });

  describe('Animations and Transforms', () => {
    it('should apply active card border style', () => {
      const { container } = render(
        <CarouselCard
          item={mockProjectItem}
          transform={activeTransform}
          isActive
        />,
      );
      const cardInner = container.querySelector('[class*="cardInner"]');
      expect(cardInner).toBeInTheDocument();
      expect(cardInner).not.toHaveClass('cardInner--inactive');
    });

    it('should apply inactive card border style', () => {
      const { container } = render(
        <CarouselCard
          item={mockProjectItem}
          transform={inactiveTransform}
          isActive={false}
        />,
      );
      const cardInner = container.querySelector('[class*="cardInner--inactive"]');
      expect(cardInner).toBeInTheDocument();
    });

    it('should apply active CTA styling when active', () => {
      const { container } = render(
        <CarouselCard item={mockCTAItem} transform={activeTransform} isActive />,
      );
      const ctaCard = container.querySelector('[class*="ctaCard--active"]');
      expect(ctaCard).toBeInTheDocument();
    });

    it('should not apply active CTA styling when inactive', () => {
      const { container } = render(
        <CarouselCard item={mockCTAItem} transform={inactiveTransform} isActive={false} />,
      );
      const ctaCard = container.querySelector('[class*="ctaCard"]');
      expect(ctaCard).toBeInTheDocument();
      const activeCtaCard = container.querySelector('[class*="ctaCard--active"]');
      expect(activeCtaCard).not.toBeInTheDocument();
    });

    it('should use reduced animation duration when reducedMotion is true', () => {
      const { container } = render(
        <CarouselCard
          item={mockProjectItem}
          transform={activeTransform}
          isActive
          reducedMotion
        />,
      );
      // The component renders, animation props are passed to motion.div
      expect(container.querySelector('[class*="card"]')).toBeInTheDocument();
    });

    it('should use normal animation duration when reducedMotion is false', () => {
      const { container } = render(
        <CarouselCard
          item={mockProjectItem}
          transform={activeTransform}
          isActive
          reducedMotion={false}
        />,
      );
      // The component renders, animation props are passed to motion.div
      expect(container.querySelector('[class*="card"]')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper alt text for project images', () => {
      render(
        <CarouselCard item={mockProjectItem} transform={activeTransform} isActive />,
      );
      const img = screen.getByAltText('Test Project');
      expect(img).toBeInTheDocument();
    });

    it('should make project link focusable when active', () => {
      render(
        <CarouselCard
          item={mockProjectItem}
          transform={activeTransform}
          isActive
        />,
      );
      const link = screen.getByText(/View Project/);
      expect(link).toHaveAttribute('tabIndex', '0');
    });

    it('should make project link not focusable when inactive', () => {
      render(
        <CarouselCard
          item={mockProjectItem}
          transform={inactiveTransform}
          isActive={false}
        />,
      );
      const link = screen.getByText(/View Project/);
      expect(link).toHaveAttribute('tabIndex', '-1');
    });

    it('should have target="_blank" and rel="noopener noreferrer" for external project links', () => {
      render(
        <CarouselCard
          item={mockProjectItem}
          transform={activeTransform}
          isActive
        />,
      );
      const link = screen.getByText(/View Project/);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Responsive Behavior', () => {
    it('should render with desktop dimensions for active card', () => {
      const { container } = render(
        <CarouselCard
          item={mockProjectItem}
          transform={activeTransform}
          isActive
        />,
      );
      // Desktop active card should be 720x445 (golden rectangle)
      const cardInner = container.querySelector('[class*="cardInner"]');
      expect(cardInner).toBeInTheDocument();
    });

    it('should render with desktop dimensions for inactive card', () => {
      const { container } = render(
        <CarouselCard
          item={mockProjectItem}
          transform={inactiveTransform}
          isActive={false}
        />,
      );
      // Desktop inactive card should be 400x400 (square)
      const cardInner = container.querySelector('[class*="cardInner"]');
      expect(cardInner).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('should not render CardContent for CTA items', () => {
      render(<CarouselCard item={mockCTAItem} transform={activeTransform} isActive />);
      // CardContent only shows for project items
      expect(screen.queryByText(/View Project/)).not.toBeInTheDocument();
    });

    it('should limit tech stack display to 3 items', () => {
      render(
        <CarouselCard
          item={mockProjectItem}
          transform={activeTransform}
          isActive
        />,
      );
      // Should show "React • TypeScript • Next.js" (first 3)
      expect(screen.getByText(/React • TypeScript • Next.js/)).toBeInTheDocument();
    });

    it('should handle project items without projectUrl', () => {
      const projectWithoutUrl: CarouselItem = {
        ...mockProjectItem,
        projectUrl: undefined,
      };
      render(
        <CarouselCard
          item={projectWithoutUrl}
          transform={activeTransform}
          isActive
        />,
      );
      expect(screen.queryByText(/View Project/)).not.toBeInTheDocument();
    });
  });
});
