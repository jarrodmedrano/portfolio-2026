import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CarouselIndicators from '../CarouselIndicators';

describe('CarouselIndicators', () => {
  const mockOnNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render correct number of indicator dots', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.getAllByRole('tab');
      expect(dots).toHaveLength(5);
    });

    it('should render single dot when totalItems is 1', () => {
      render(
        <CarouselIndicators
          totalItems={1}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.getAllByRole('tab');
      expect(dots).toHaveLength(1);
    });

    it('should render 3 dots when totalItems is 3', () => {
      render(
        <CarouselIndicators
          totalItems={3}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.getAllByRole('tab');
      expect(dots).toHaveLength(3);
    });

    it('should highlight the active dot', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={2}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.getAllByRole('tab');
      expect(dots[2]).toHaveAttribute('aria-selected', 'true');
      expect(dots[0]).toHaveAttribute('aria-selected', 'false');
      expect(dots[1]).toHaveAttribute('aria-selected', 'false');
      expect(dots[3]).toHaveAttribute('aria-selected', 'false');
      expect(dots[4]).toHaveAttribute('aria-selected', 'false');
    });

    it('should apply active class to active dot', () => {
      const { container } = render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={1}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = container.querySelectorAll('[class*="dot"]');
      // CSS modules add hash suffixes, so we check for the pattern
      expect(dots[1].className).toMatch(/dot--active/);
    });

    it('should not apply active class to inactive dots', () => {
      const { container } = render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={2}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = container.querySelectorAll('[class*="dot"]');
      // CSS modules add hash suffixes, so we check for the pattern
      expect(dots[0].className).not.toMatch(/dot--active/);
      expect(dots[1].className).not.toMatch(/dot--active/);
      expect(dots[3].className).not.toMatch(/dot--active/);
      expect(dots[4].className).not.toMatch(/dot--active/);
    });
  });

  describe('Navigation', () => {
    it('should call onNavigate with correct index when dot is clicked', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.getAllByRole('tab');
      fireEvent.click(dots[2]);

      expect(mockOnNavigate).toHaveBeenCalledTimes(1);
      expect(mockOnNavigate).toHaveBeenCalledWith(2);
    });

    it('should navigate to first item when first dot is clicked', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={3}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.getAllByRole('tab');
      fireEvent.click(dots[0]);

      expect(mockOnNavigate).toHaveBeenCalledWith(0);
    });

    it('should navigate to last item when last dot is clicked', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.getAllByRole('tab');
      fireEvent.click(dots[4]);

      expect(mockOnNavigate).toHaveBeenCalledWith(4);
    });

    it('should handle clicking on active dot', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={2}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.getAllByRole('tab');
      fireEvent.click(dots[2]);

      expect(mockOnNavigate).toHaveBeenCalledWith(2);
    });

    it('should handle rapid sequential clicks', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.getAllByRole('tab');
      fireEvent.click(dots[1]);
      fireEvent.click(dots[2]);
      fireEvent.click(dots[3]);

      expect(mockOnNavigate).toHaveBeenCalledTimes(3);
      expect(mockOnNavigate).toHaveBeenNthCalledWith(1, 1);
      expect(mockOnNavigate).toHaveBeenNthCalledWith(2, 2);
      expect(mockOnNavigate).toHaveBeenNthCalledWith(3, 3);
    });
  });

  describe('Accessibility', () => {
    it('should have role="tablist" on container', () => {
      const { container } = render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toBeInTheDocument();
    });

    it('should have aria-label on tablist', () => {
      const { container } = render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toHaveAttribute('aria-label', 'Carousel navigation');
    });

    it('should have role="tab" on each dot', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.getAllByRole('tab');
      expect(dots).toHaveLength(5);
      dots.forEach((dot) => {
        expect(dot).toHaveAttribute('role', 'tab');
      });
    });

    it('should have proper aria-label for each dot', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      expect(screen.getByLabelText('Project 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Project 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Project 3')).toBeInTheDocument();
      expect(screen.getByLabelText('Project 4')).toBeInTheDocument();
      expect(screen.getByLabelText('Project 5')).toBeInTheDocument();
    });

    it('should set aria-selected="true" on active dot', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={2}
          onNavigate={mockOnNavigate}
        />,
      );

      const activeDot = screen.getByLabelText('Project 3');
      expect(activeDot).toHaveAttribute('aria-selected', 'true');
    });

    it('should set aria-selected="false" on inactive dots', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={2}
          onNavigate={mockOnNavigate}
        />,
      );

      const dot1 = screen.getByLabelText('Project 1');
      const dot2 = screen.getByLabelText('Project 2');
      const dot4 = screen.getByLabelText('Project 4');
      const dot5 = screen.getByLabelText('Project 5');

      expect(dot1).toHaveAttribute('aria-selected', 'false');
      expect(dot2).toHaveAttribute('aria-selected', 'false');
      expect(dot4).toHaveAttribute('aria-selected', 'false');
      expect(dot5).toHaveAttribute('aria-selected', 'false');
    });

    it('should have type="button" on all dots', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.getAllByRole('tab');
      dots.forEach((dot) => {
        expect(dot).toHaveAttribute('type', 'button');
      });
    });
  });

  describe('State Updates', () => {
    it('should update active indicator when activeIndex changes', () => {
      const { rerender } = render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      let dots = screen.getAllByRole('tab');
      expect(dots[0]).toHaveAttribute('aria-selected', 'true');

      rerender(
        <CarouselIndicators
          totalItems={5}
          activeIndex={3}
          onNavigate={mockOnNavigate}
        />,
      );

      dots = screen.getAllByRole('tab');
      expect(dots[0]).toHaveAttribute('aria-selected', 'false');
      expect(dots[3]).toHaveAttribute('aria-selected', 'true');
    });

    it('should handle activeIndex at boundaries', () => {
      const { rerender } = render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      let dots = screen.getAllByRole('tab');
      expect(dots[0]).toHaveAttribute('aria-selected', 'true');

      rerender(
        <CarouselIndicators
          totalItems={5}
          activeIndex={4}
          onNavigate={mockOnNavigate}
        />,
      );

      dots = screen.getAllByRole('tab');
      expect(dots[4]).toHaveAttribute('aria-selected', 'true');
    });

    it('should render different number of dots when totalItems changes', () => {
      const { rerender } = render(
        <CarouselIndicators
          totalItems={3}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      let dots = screen.getAllByRole('tab');
      expect(dots).toHaveLength(3);

      rerender(
        <CarouselIndicators
          totalItems={7}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      dots = screen.getAllByRole('tab');
      expect(dots).toHaveLength(7);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero totalItems gracefully', () => {
      render(
        <CarouselIndicators
          totalItems={0}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.queryAllByRole('tab');
      expect(dots).toHaveLength(0);
    });

    it('should handle activeIndex out of bounds (greater than totalItems)', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={10}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.getAllByRole('tab');
      // No dot should be selected since index is out of bounds
      dots.forEach((dot) => {
        expect(dot).toHaveAttribute('aria-selected', 'false');
      });
    });

    it('should handle negative activeIndex', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={-1}
          onNavigate={mockOnNavigate}
        />,
      );

      const dots = screen.getAllByRole('tab');
      // No dot should be selected since index is negative
      dots.forEach((dot) => {
        expect(dot).toHaveAttribute('aria-selected', 'false');
      });
    });
  });

  describe('Unique Keys', () => {
    it('should have unique keys for each dot', () => {
      render(
        <CarouselIndicators
          totalItems={5}
          activeIndex={0}
          onNavigate={mockOnNavigate}
        />,
      );

      // Check that dots are rendered (keys are internal to React)
      const dots = screen.getAllByRole('tab');
      expect(dots).toHaveLength(5);
    });
  });
});
