import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SelectedWork from './SelectedWork';

describe('SelectedWork', () => {
  it('renders section heading', () => {
    render(<SelectedWork />);

    expect(screen.getByText('Selected Work')).toBeInTheDocument();
  });

  it('renders all project titles', () => {
    render(<SelectedWork />);

    expect(screen.getByText('Portuguese Verb Conjugator')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Starter Template')).toBeInTheDocument();
    expect(screen.getByText('Story Bible App')).toBeInTheDocument();
    expect(screen.getByText('Binary Quiz Game')).toBeInTheDocument();
  });
});
