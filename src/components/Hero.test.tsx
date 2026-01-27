import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('renders headline and subheading', () => {
    render(<Hero />);

    expect(screen.getByText(/Senior Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Full-Stack Development/i)).toBeInTheDocument();
    expect(screen.getByText(/Austin, TX/i)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero />);

    expect(screen.getByText(/View Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument();
  });
});
