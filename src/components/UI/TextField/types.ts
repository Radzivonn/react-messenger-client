import { type ComponentProps } from 'react';

export interface ITextFieldProps extends ComponentProps<'input'> {
  label: string;
  name: string;
  helpText?: string;
  isValid?: boolean;
  dateOfBirth?: string;
}
