import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RecentThoughts from './RecentThoughts';

describe('RecentThoughts', () => {
  it('renders section heading', () => {
    render(<RecentThoughts />);
    expect(screen.getByText('Recent Thoughts')).toBeInTheDocument();
  });

  it('renders BlueSky follow link', async () => {
    render(<RecentThoughts />);
    // Wait for the error state to show (fetch will fail in test environment)
    await waitFor(() => {
      expect(screen.getByText(/Follow me on BlueSky/i)).toBeInTheDocument();
    });
  });
});
