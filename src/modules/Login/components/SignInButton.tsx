import React, { FC } from 'react';
import { Button } from 'components/UI/Button/Button';

export const SignInButton: FC = () => {
  return (
    <Button accent className="form__button" type="submit" form="LoginForm">
      Sign in
    </Button>
  );
};
