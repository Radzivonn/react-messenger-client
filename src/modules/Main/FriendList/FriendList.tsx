import React from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import { useFriendList } from '../../../hooks/useFriendList/useFriendList';
import { TailSpinner } from '../../../components/UI/Spinners/TailSpinner';
import { routes } from '../../../router/routes';
import { UserTab } from '../../../components/UI/Tabs/User-tab';
import { MainPageComponentOutletContextType } from '../../../types/types';

export const FriendList = () => {
  const { userId } = useOutletContext<MainPageComponentOutletContextType>();
  const { isFetching, data, isError } = useFriendList(userId);

  if (isError) return <Navigate to={`/${routes.login}`} replace />;

  if (isFetching || !data) return <TailSpinner />;

  if (!data.length) return <h2 className="m-auto text-xl italic">Your friends list is empty</h2>;

  return (
    <>
      {data.map((friend) => (
        <UserTab
          key={friend.id}
          name={friend.name}
          userId={userId}
          friendId={friend.id}
          isFriend={true}
        />
      ))}
    </>
  );
};
