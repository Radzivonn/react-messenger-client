import { FC } from 'react';
import { Button } from 'components/UI/Button/Button';

export const SignInButton: FC = () => {
  return (
    <Button
      accent
      className="form__button"
      type="submit"
      form="LoginForm"
      data-testid="login-submit-button"
    >
      Sign in
    </Button>
  );
};
