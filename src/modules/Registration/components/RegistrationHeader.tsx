import React, { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="registration__header">
      <h2 className="visually-hidden">Registration form</h2>
      <p className="registration__title">Sign up</p>
      <p className="registration__description">Please sign up below</p>
    </header>
  );
};
