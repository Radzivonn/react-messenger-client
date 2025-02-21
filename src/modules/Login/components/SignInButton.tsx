import { FC } from 'react';
import { Button } from 'components/UI/Button/Button';

interface Props {
  isDisabled: boolean;
}

export const SignInButton: FC<Props> = ({ isDisabled }) => {
  return (
    <Button
      accent
      className="form__button"
      type="submit"
      form="LoginForm"
      data-testid="login-submit-button"
      disabled={isDisabled}
    >
      Sign in
    </Button>
  );
};
