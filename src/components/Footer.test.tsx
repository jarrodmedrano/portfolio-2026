import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 Jarrod Medrano/i)).toBeInTheDocument();
  });

  it('renders tech stack info', () => {
    render(<Footer />);
    expect(
      screen.getByText(/Built with Next.js, TypeScript, and Tailwind CSS/i),
    ).toBeInTheDocument();
  });
});
