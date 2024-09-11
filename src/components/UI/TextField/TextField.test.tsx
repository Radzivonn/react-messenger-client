import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { TextField } from './TextField';

describe('Custom text field component test', () => {
  it('text field render', () => {
    render(
      <TextField data-testid={'mock-text-field'} name="mock-text-field-name" isValid={false} />,
    );

    const textField = screen.getByTestId('mock-text-field');
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveClass('text-field__input');
    expect(textField.parentElement).toHaveClass('text-field__container');
    expect(textField.parentElement?.parentElement).toHaveClass('text-field');
    expect(textField.parentElement?.parentElement).toHaveClass('text-field--invalid');
  });

  it('check text field with password type', () => {
    render(
      <TextField data-testid={'mock-text-field'} name="mock-text-field-name" type="password" />,
    );

    const textField = screen.getByTestId('mock-text-field');
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveClass('text-field__input');

    const passwordOpenedEyeIcon = screen.getByTitle('opened-eye-icon');
    expect(passwordOpenedEyeIcon).toBeInTheDocument();
    expect(passwordOpenedEyeIcon.parentElement).toHaveStyle('pointerEvents: auto');

    fireEvent.click(passwordOpenedEyeIcon.parentElement!);

    const passwordClosedEyeIcon = screen.getByTitle('closed-eye-icon');
    expect(passwordClosedEyeIcon).toBeInTheDocument();
    expect(passwordClosedEyeIcon.parentElement).toHaveStyle('pointerEvents: auto');

    fireEvent.click(passwordClosedEyeIcon.parentElement!);

    expect(screen.getByTitle('opened-eye-icon')).toBeInTheDocument();
  });

  it('check text field with search type', () => {
    render(<TextField data-testid="mock-text-field" name="mock-text-field-name" type="search" />);

    const textField = screen.getByTestId('mock-text-field');
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveClass('text-field__input');

    const searchIcon = screen.getByTitle('search-icon');
    expect(searchIcon).toBeInTheDocument();

    expect(searchIcon.parentElement).toHaveStyle('pointerEvents: none');
  });

  it('check text field with label', () => {
    render(
      <TextField data-testid={'mock-text-field'} name="mock-text-field-name" label="mock-label" />,
    );

    const textField = screen.getByTestId('mock-text-field');
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveClass('text-field__input');

    const label = screen.getAllByText('mock-label');
    expect(label[0]).toBeInTheDocument();
    expect(label[0]).toHaveClass('text-field__label');
  });
});
