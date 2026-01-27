import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WhatIBuild from './WhatIBuild';

describe('WhatIBuild', () => {
  it('renders section heading', () => {
    render(<WhatIBuild />);
    expect(screen.getByText('What I Build')).toBeInTheDocument();
  });

  it('renders service offerings', () => {
    render(<WhatIBuild />);
    expect(screen.getByText('MVP Development')).toBeInTheDocument();
    expect(screen.getByText('Production Applications')).toBeInTheDocument();
    expect(screen.getByText('Technical Consulting')).toBeInTheDocument();
  });
});
