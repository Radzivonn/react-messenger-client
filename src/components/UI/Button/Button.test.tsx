import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Custom Button component test', () => {
  it('custom button render', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
  });

  it('custom accent button', () => {
    render(<Button accent />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button--accent');
  });

  it('custom rounded button', () => {
    render(<Button rounded />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button--rounded');
  });
});
