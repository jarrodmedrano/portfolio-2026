import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CarouselControls from '../CarouselControls';

describe('CarouselControls', () => {
  const mockOnPrev = vi.fn();
  const mockOnNext = vi.fn();
  const mockOnToggleAutoPlay = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all three control buttons', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      expect(screen.getByLabelText('Previous project')).toBeInTheDocument();
      expect(screen.getByLabelText('Next project')).toBeInTheDocument();
      expect(screen.getByLabelText('Pause auto-rotation')).toBeInTheDocument();
    });

    it('should render pause icon when auto-playing', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      const pauseButton = screen.getByLabelText('Pause auto-rotation');
      expect(pauseButton).toBeInTheDocument();
      // Pause icon has two rectangles
      const svg = pauseButton.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render play icon when not auto-playing', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying={false}
        />,
      );

      const playButton = screen.getByLabelText('Play auto-rotation');
      expect(playButton).toBeInTheDocument();
      // Play icon is a triangle
      const svg = playButton.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render left arrow icon', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      const prevButton = screen.getByLabelText('Previous project');
      const svg = prevButton.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('should render right arrow icon', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      const nextButton = screen.getByLabelText('Next project');
      const svg = nextButton.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });
  });

  describe('Button Interactions', () => {
    it('should call onPrev when previous button is clicked', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      const prevButton = screen.getByLabelText('Previous project');
      fireEvent.click(prevButton);

      expect(mockOnPrev).toHaveBeenCalledTimes(1);
      expect(mockOnNext).not.toHaveBeenCalled();
      expect(mockOnToggleAutoPlay).not.toHaveBeenCalled();
    });

    it('should call onNext when next button is clicked', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      const nextButton = screen.getByLabelText('Next project');
      fireEvent.click(nextButton);

      expect(mockOnNext).toHaveBeenCalledTimes(1);
      expect(mockOnPrev).not.toHaveBeenCalled();
      expect(mockOnToggleAutoPlay).not.toHaveBeenCalled();
    });

    it('should call onToggleAutoPlay when pause button is clicked', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      const pauseButton = screen.getByLabelText('Pause auto-rotation');
      fireEvent.click(pauseButton);

      expect(mockOnToggleAutoPlay).toHaveBeenCalledTimes(1);
      expect(mockOnPrev).not.toHaveBeenCalled();
      expect(mockOnNext).not.toHaveBeenCalled();
    });

    it('should call onToggleAutoPlay when play button is clicked', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying={false}
        />,
      );

      const playButton = screen.getByLabelText('Play auto-rotation');
      fireEvent.click(playButton);

      expect(mockOnToggleAutoPlay).toHaveBeenCalledTimes(1);
      expect(mockOnPrev).not.toHaveBeenCalled();
      expect(mockOnNext).not.toHaveBeenCalled();
    });

    it('should handle multiple rapid clicks on prev button', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      const prevButton = screen.getByLabelText('Previous project');
      fireEvent.click(prevButton);
      fireEvent.click(prevButton);
      fireEvent.click(prevButton);

      expect(mockOnPrev).toHaveBeenCalledTimes(3);
    });

    it('should handle multiple rapid clicks on next button', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      const nextButton = screen.getByLabelText('Next project');
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);

      expect(mockOnNext).toHaveBeenCalledTimes(3);
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label for previous button', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      const prevButton = screen.getByLabelText('Previous project');
      expect(prevButton).toHaveAttribute('aria-label', 'Previous project');
    });

    it('should have proper aria-label for next button', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      const nextButton = screen.getByLabelText('Next project');
      expect(nextButton).toHaveAttribute('aria-label', 'Next project');
    });

    it('should have proper aria-label for pause button', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      const pauseButton = screen.getByLabelText('Pause auto-rotation');
      expect(pauseButton).toHaveAttribute('aria-label', 'Pause auto-rotation');
    });

    it('should have proper aria-label for play button', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying={false}
        />,
      );

      const playButton = screen.getByLabelText('Play auto-rotation');
      expect(playButton).toHaveAttribute('aria-label', 'Play auto-rotation');
    });

    it('should have aria-pressed="true" when auto-playing is paused', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying={false}
        />,
      );

      const playButton = screen.getByLabelText('Play auto-rotation');
      expect(playButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('should have aria-pressed="false" when auto-playing is active', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      const pauseButton = screen.getByLabelText('Pause auto-rotation');
      expect(pauseButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('should have type="button" to prevent form submission', () => {
      render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      const prevButton = screen.getByLabelText('Previous project');
      const nextButton = screen.getByLabelText('Next project');
      const pauseButton = screen.getByLabelText('Pause auto-rotation');

      expect(prevButton).toHaveAttribute('type', 'button');
      expect(nextButton).toHaveAttribute('type', 'button');
      expect(pauseButton).toHaveAttribute('type', 'button');
    });
  });

  describe('State Changes', () => {
    it('should update button label when isAutoPlaying changes from true to false', () => {
      const { rerender } = render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      expect(screen.getByLabelText('Pause auto-rotation')).toBeInTheDocument();

      rerender(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying={false}
        />,
      );

      expect(screen.getByLabelText('Play auto-rotation')).toBeInTheDocument();
      expect(screen.queryByLabelText('Pause auto-rotation')).not.toBeInTheDocument();
    });

    it('should update button label when isAutoPlaying changes from false to true', () => {
      const { rerender } = render(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying={false}
        />,
      );

      expect(screen.getByLabelText('Play auto-rotation')).toBeInTheDocument();

      rerender(
        <CarouselControls
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          onToggleAutoPlay={mockOnToggleAutoPlay}
          isAutoPlaying
        />,
      );

      expect(screen.getByLabelText('Pause auto-rotation')).toBeInTheDocument();
      expect(screen.queryByLabelText('Play auto-rotation')).not.toBeInTheDocument();
    });
  });
});
