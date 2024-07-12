import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../router/routes';

export const RegistrationNote: FC = () => {
  return (
    <p className="registration__note">
      {'Already have an account? '}
      <Link to={`/${routes.login}`} className="link">
        Log in!
      </Link>
    </p>
  );
};
