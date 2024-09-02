import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Form } from './Form';

describe('Custom Form component test', () => {
  it('custom form render', () => {
    render(<Form data-testid="custom-form" />);
    const form = screen.getByTestId('custom-form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass('form');
  });
});
