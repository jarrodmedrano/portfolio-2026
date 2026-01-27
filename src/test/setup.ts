import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi } from 'vitest';

// Mock IntersectionObserver for Framer Motion viewport animations
beforeAll(() => {
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: vi.fn(() => []),
  })) as unknown as typeof IntersectionObserver;
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});
