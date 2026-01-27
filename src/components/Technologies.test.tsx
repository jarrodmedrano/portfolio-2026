import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Technologies from './Technologies';

describe('Technologies', () => {
  it('renders section heading', () => {
    render(<Technologies />);
    expect(screen.getByText('Technologies')).toBeInTheDocument();
  });

  it('renders tech categories', () => {
    render(<Technologies />);
    expect(screen.getByText(/Frontend:/i)).toBeInTheDocument();
    expect(screen.getByText(/Backend & Data:/i)).toBeInTheDocument();
    expect(screen.getByText(/DevOps & Infrastructure:/i)).toBeInTheDocument();
  });
});
