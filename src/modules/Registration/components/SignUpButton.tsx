import React, { FC } from 'react';
import { Button } from 'components/UI/Button/Button';

export const SignUpButton: FC = () => {
  return (
    <Button accent type="submit" form="RegistrationForm" data-testid="registration-submit-button">
      Sign Up
    </Button>
  );
};
