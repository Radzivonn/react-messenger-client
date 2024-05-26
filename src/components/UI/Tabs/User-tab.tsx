import React, { ComponentProps, FC } from 'react';
import { Tab } from './BaseTab/Tab';
import { RemoveFriendButton } from '../../FunctionalButtons/RemoveFriendButton';
import { AddFriendButton } from '../../FunctionalButtons/AddFriendButton';

interface Props extends ComponentProps<'div'> {
  userId: string;
  friendId: string;
  name: string;
  isFriend: boolean;
}

export const UserTab: FC<Props> = ({ name, isFriend, userId, friendId }) => {
  return (
    <Tab>
      <div className="tab__info_avatar-placeholder">{name.slice(0, 1)}</div>
      <h3 className="tab__info_name">{name}</h3>
      {isFriend ? (
        <RemoveFriendButton userId={userId} friendId={friendId} />
      ) : (
        <AddFriendButton userId={userId} friendId={friendId} />
      )}
    </Tab>
  );
};
