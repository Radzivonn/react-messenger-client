import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useFriendList } from '../../../hooks/useFriendList/useFriendList';
import { TailSpinner } from '../../../components/UI/Spinners/TailSpinner';
import routes from '../../../router/routes';
import { FriendTab } from '../../../components/UI/Tabs/Friend-tab';

export const FriendList = () => {
  const { id } = useParams() as { id: string };
  const { isPending, data, isError } = useFriendList(id);

  if (isError) return <Navigate to={`/${routes.login}`} replace />;

  if (isPending || !data) return <TailSpinner />;

  return (
    <>
      {data.map((user) => (
        <FriendTab key={user.id} name={user.name}></FriendTab>
      ))}
    </>
  );
};
