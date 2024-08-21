import React, { FC } from 'react';
import { Button } from 'components/UI/Button/Button';

export const SignUpButton: FC = () => {
  return (
    <Button type="submit" form="RegistrationForm" accent>
      Sign Up
    </Button>
  );
};
