import './style.scss';
import React from 'react';
import { Header } from './components/RegistrationHeader';
import { RegistrationForm } from './components/RegistrationForm/Form';
import { SignUpButton } from './components/SignUpButton';
import { RegistrationNote } from './components/RegistrationNote';

export const RegistrationModule = () => {
  return (
    <section className="registration" data-testid="registration">
      <div className="registration__container page-wrapper">
        <Header />
        <RegistrationForm />
        <SignUpButton />
        <RegistrationNote />
      </div>
    </section>
  );
};
