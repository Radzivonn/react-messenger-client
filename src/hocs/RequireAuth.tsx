import React, { type FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { type ChildrenProps } from './types';
import { routes } from '../router/routes';
import { useUserData } from '../hooks/useUserData/useUserData';
import { TailSpinner } from '../components/UI/Spinners/TailSpinner';

export const RequireAuth: FC<ChildrenProps> = ({ children }) => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to={`/${routes.login}`} replace />;
  }

  const { isFetching, data, isError } = useUserData();

  if ((!isFetching && (!data || data.id !== id)) || isError) {
    return <Navigate to={`/${routes.login}`} replace />;
  }

  if (isFetching) {
    return <TailSpinner />;
  }

  return children;
};
