import { render, screen, waitFor } from '@testing-library/react';
import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';
import RecentThoughts from './RecentThoughts';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe('RecentThoughts', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders section heading', () => {
    mockFetch.mockResolvedValue({
      json: async () => ({ posts: [] }),
    });

    render(<RecentThoughts />);
    expect(screen.getByText('Recent Thoughts')).toBeInTheDocument();
  });

  it('renders BlueSky follow link in error state', async () => {
    mockFetch.mockRejectedValue(new Error('API Error'));

    render(<RecentThoughts />);

    await waitFor(() => {
      expect(screen.getByText(/Follow me on BlueSky/i)).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    mockFetch.mockResolvedValue({
      json: async () => new Promise(() => {}), // Never resolves
    });

    render(<RecentThoughts />);
    expect(screen.getByText('Loading posts...')).toBeInTheDocument();
  });

  it('shows error state when API fails', async () => {
    mockFetch.mockRejectedValue(new Error('API Error'));

    render(<RecentThoughts />);

    await waitFor(() => {
      expect(screen.getByText(/Unable to load posts/i)).toBeInTheDocument();
    });
  });
});
