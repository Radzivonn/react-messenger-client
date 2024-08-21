import React, { type FC } from 'react';
import { Navigate } from 'react-router-dom';
import { type ChildrenProps } from './types';
import { useUserData } from 'hooks/useUserData/useUserData';
import { TailSpinner } from 'components/UI/Loaders/TailSpinner';

export const CheckAuth: FC<ChildrenProps> = ({ children }) => {
  const { isFetching, data, isError } = useUserData();

  if ((!isFetching && !data) || isError) {
    return children;
  }

  if (isFetching || !data) {
    return <TailSpinner />;
  }

  return <Navigate to={`/users/${data.id}/${data.name}`} replace />;
};
