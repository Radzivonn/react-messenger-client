import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useFriendList } from '../../../hooks/useFriendList/useFriendList';
import { TailSpinner } from '../../../components/UI/Spinners/TailSpinner';
import { UserTab } from '../../../components/UI/Tabs/User-tab';
import { MainPageComponentOutletContext } from '../../../types/types';
import { useQueryClient } from '@tanstack/react-query';

export const FriendList = () => {
  const queryClient = useQueryClient();
  const { userId } = useOutletContext<MainPageComponentOutletContext>();
  const { isFetching, data, isError } = useFriendList(userId);

  // ??? Сделано для инвалидации данных пользователя с последующей проверкой через RequireAuth hoc на авторизацию
  if (isError) {
    void queryClient.invalidateQueries({ queryKey: ['userData'] });
  }

  if (isFetching || !data) return <TailSpinner />;

  if (!data.length) return <h2 className="text-hint">Your friends list is empty</h2>;

  return (
    <>
      {data.map((friend) => (
        <UserTab
          key={friend.id}
          name={friend.name}
          userId={userId}
          friendId={friend.id}
          isFriend={true}
          isOnline={friend.online}
        />
      ))}
    </>
  );
};
