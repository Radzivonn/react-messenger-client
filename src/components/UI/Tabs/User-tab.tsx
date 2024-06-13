import React, { ComponentProps, FC } from 'react';
import { Tab } from './BaseTab/Tab';
import { RemoveFriendButton } from '../../FunctionalButtons/RemoveFriendButton';
import { AddFriendButton } from '../../FunctionalButtons/AddFriendButton';
import { WriteToFriendButton } from '../../FunctionalButtons/WriteToFriendButton';

interface Props extends ComponentProps<'div'> {
  name: string;
  isFriend: boolean;
  userId: string;
  friendId: string;
}

export const UserTab: FC<Props> = ({ name, isFriend, userId, friendId, ...props }) => {
  return (
    <Tab {...props}>
      <div className="avatar-placeholder">{name.slice(0, 1)}</div>
      <h3 className="tab__info_name">{name}</h3>
      {isFriend ? (
        <>
          <WriteToFriendButton userId={userId} friendId={friendId} friendName={name} />
          <RemoveFriendButton userId={userId} friendId={friendId} />
        </>
      ) : (
        <AddFriendButton userId={userId} friendId={friendId} />
      )}
    </Tab>
  );
};
