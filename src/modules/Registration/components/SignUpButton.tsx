import { FC } from 'react';
import { Button } from 'components/UI/Button/Button';

interface Props {
  isDisabled: boolean;
}

export const SignUpButton: FC<Props> = ({ isDisabled }) => {
  return (
    <Button
      accent
      type="submit"
      form="RegistrationForm"
      data-testid="registration-submit-button"
      disabled={isDisabled}
    >
      Sign Up
    </Button>
  );
};
