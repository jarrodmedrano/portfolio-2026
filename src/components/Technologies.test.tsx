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

  it('renders individual technology items', () => {
    render(<Technologies />);
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/PostgreSQL/i)).toBeInTheDocument();
    expect(screen.getByText(/Docker/i)).toBeInTheDocument();
  });

  it('renders currently learning section', () => {
    render(<Technologies />);
    expect(screen.getByText(/Currently Learning:/i)).toBeInTheDocument();
    expect(screen.getByText(/Rust/i)).toBeInTheDocument();
  });
});
