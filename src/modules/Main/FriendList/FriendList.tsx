import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useFriendList } from 'hooks/useFriendList/useFriendList';
import { TailSpinner } from 'components/UI/Loaders/TailSpinner';
import { UserTab } from 'components/UI/Tabs/User-tab';
import { MainPageComponentOutletContext } from 'types/types';
import { useFriendsOnlineStatusesStore } from 'store/onlineStatuses/onlineStatusesStore';

export const FriendList = () => {
  const { userId } = useOutletContext<MainPageComponentOutletContext>();
  const { isFetching, data } = useFriendList(userId);

  const onlineStatuses = useFriendsOnlineStatusesStore((state) => state.onlineStatuses);

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
          isOnline={onlineStatuses[friend.id] ?? false}
        />
      ))}
    </>
  );
};
