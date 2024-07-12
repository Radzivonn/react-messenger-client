import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../router/routes';

export const LoginNote: FC = () => {
  return (
    <p className="form__note">
      {`Not a member? `}
      <Link to={`/${routes.registration}`} className="link">
        Join us!
      </Link>
    </p>
  );
};
