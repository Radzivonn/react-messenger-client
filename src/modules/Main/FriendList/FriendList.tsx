import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useFriendList } from '../../../hooks/useFriendList/useFriendList';
import { TailSpinner } from '../../../components/UI/Spinners/TailSpinner';
import routes from '../../../router/routes';
import { UserTab } from '../../../components/UI/Tabs/User-tab';

export const FriendList = () => {
  const { id } = useParams() as { id: string };
  const { isFetching, data, isError } = useFriendList(id);

  if (isError) return <Navigate to={`/${routes.login}`} replace />;

  if (isFetching || !data) return <TailSpinner />;

  if (!data.length) return <h2 className="m-auto text-xl italic">Your friends list is empty</h2>;

  return (
    <>
      {data.map((friend) => (
        <UserTab
          key={friend.id}
          name={friend.name}
          userId={id}
          friendId={friend.id}
          isFriend={true}
        />
      ))}
    </>
  );
};
