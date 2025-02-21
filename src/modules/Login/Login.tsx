import './style.scss';
import { Header } from './components/LoginHeader';
import { LoginForm } from './components/LoginForm/Form';
import { SignInButton } from './components/SignInButton';
import { LoginNote } from './components/LoginNote';
import { useLogin } from 'hooks/useAuthMutations/useLogin';

export const LoginModule = () => {
  const { isPending, mutate } = useLogin();

  return (
    <section className="login" data-testid="login">
      <div className="login__container page-wrapper">
        <Header />
        <LoginForm login={mutate} />
        <SignInButton isDisabled={isPending} />
        <LoginNote />
      </div>
    </section>
  );
};
