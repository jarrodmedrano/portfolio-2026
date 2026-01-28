import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useResponsive } from '../useResponsive';

describe('useResponsive', () => {
  // Store original innerWidth
  const originalInnerWidth = window.innerWidth;

  // Helper to mock window.innerWidth
  const mockInnerWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
  };

  afterEach(() => {
    // Restore original innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it('should return "mobile" for width < 768', () => {
    mockInnerWidth(500);
    const { result } = renderHook(() => useResponsive());
    expect(result.current).toBe('mobile');
  });

  it('should return "tablet" for width >= 768 and < 1024', () => {
    mockInnerWidth(800);
    const { result } = renderHook(() => useResponsive());
    expect(result.current).toBe('tablet');
  });

  it('should return "desktop" for width >= 1024', () => {
    mockInnerWidth(1200);
    const { result } = renderHook(() => useResponsive());
    expect(result.current).toBe('desktop');
  });

  it('should update breakpoint on window resize', () => {
    mockInnerWidth(1200);
    const { result } = renderHook(() => useResponsive());
    expect(result.current).toBe('desktop');

    // Simulate resize to tablet
    act(() => {
      mockInnerWidth(800);
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('tablet');

    // Simulate resize to mobile
    act(() => {
      mockInnerWidth(500);
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('mobile');
  });

  it('should handle edge case at 768 (mobile/tablet boundary)', () => {
    mockInnerWidth(768);
    const { result } = renderHook(() => useResponsive());
    expect(result.current).toBe('tablet');
  });

  it('should handle edge case at 1024 (tablet/desktop boundary)', () => {
    mockInnerWidth(1024);
    const { result } = renderHook(() => useResponsive());
    expect(result.current).toBe('desktop');
  });

  it('should cleanup resize event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useResponsive());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
