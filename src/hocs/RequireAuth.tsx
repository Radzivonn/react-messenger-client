import React, { type FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { type ChildrenProps } from './types';
import { routes } from 'router/routes';
import { useUserData } from 'hooks/useUserData/useUserData';
import { TailSpinner } from 'components/UI/Loaders/TailSpinner';

export const RequireAuth: FC<ChildrenProps> = ({ children }) => {
  const { id, name } = useParams();
  const { isFetching, data, isError } = useUserData();

  if ((!isFetching && (!data || data.id !== id || data.name !== name)) || isError) {
    return <Navigate to={`/${routes.login}`} replace />;
  }

  if (isFetching || !data) {
    return <TailSpinner />;
  }

  return children;
};
