import './style.scss';
import React from 'react';
import { Header } from './components/LoginHeader';
import { LoginForm } from './components/LoginForm/Form';
import { SignInButton } from './components/SignInButton';
import { LoginNote } from './components/LoginNote';

export const LoginModule = () => {
  return (
    <section className="login">
      <div className="login__container page-wrapper">
        <Header />
        <LoginForm />
        <SignInButton />
        <LoginNote />
      </div>
    </section>
  );
};
