import { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="login__header">
      <h2 className="visually-hidden">Log in section</h2>
      <p className="login__title">Welcome back</p>
      <p className="login__description">Please sign in below to continue</p>
    </header>
  );
};
