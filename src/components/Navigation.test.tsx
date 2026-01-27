import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navigation from './Navigation';

describe('Navigation', () => {
  it('renders logo and navigation links', () => {
    render(<Navigation />);

    expect(screen.getByText('JM')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Capabilities')).toBeInTheDocument();
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.getByText('Thoughts')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});
