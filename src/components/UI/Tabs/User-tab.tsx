import React, { ComponentProps, FC } from 'react';
import { Tab } from './BaseTab/Tab';
import { RemoveFriendButton } from '../../FunctionalButtons/RemoveFriendButton';
import { AddFriendButton } from '../../FunctionalButtons/AddFriendButton';
import { WriteToFriendButton } from '../../FunctionalButtons/WriteToFriendButton';

interface Props extends ComponentProps<'section'> {
  name: string;
  isFriend: boolean;
  userId: string;
  friendId: string;
}

export const UserTab: FC<Props> = ({ name, isFriend, userId, friendId, ...props }) => {
  return (
    <Tab {...props}>
      <div className="flex gap-2 overflow-hidden">
        <div className="avatar-placeholder">{name.slice(0, 1)}</div>
        <h3 className="tab__info_name ml-3">{name}</h3>
      </div>
      <div className="flex gap-2">
        {isFriend ? (
          <>
            <WriteToFriendButton userId={userId} friendId={friendId} friendName={name} />
            <RemoveFriendButton userId={userId} friendId={friendId} friendName={name} />
          </>
        ) : (
          <AddFriendButton userId={userId} friendId={friendId} friendName={name} />
        )}
      </div>
    </Tab>
  );
};
