import './style.scss';
import { Header } from './components/RegistrationHeader';
import { RegistrationForm } from './components/RegistrationForm/Form';
import { SignUpButton } from './components/SignUpButton';
import { RegistrationNote } from './components/RegistrationNote';
import { useRegister } from 'hooks/useAuthMutations/useRegister';

export const RegistrationModule = () => {
  const { isPending, mutate } = useRegister();

  return (
    <section className="registration" data-testid="registration">
      <div className="registration__container page-wrapper">
        <Header />
        <RegistrationForm registration={mutate} />
        <SignUpButton isDisabled={isPending} />
        <RegistrationNote />
      </div>
    </section>
  );
};
