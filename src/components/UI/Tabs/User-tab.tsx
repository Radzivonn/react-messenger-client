import React, { ComponentProps, FC } from 'react';
import { Tab } from './BaseTab/Tab';
import { RemoveFriendButton } from '../../FunctionalButtons/RemoveFriendButton';
import { AddFriendButton } from '../../FunctionalButtons/AddFriendButton';
import { WriteToFriendButton } from '../../FunctionalButtons/WriteToFriendButton';
import { AvatarImage } from '../AvatarUI/AvatarImage';

interface Props extends ComponentProps<'section'> {
  name: string;
  friendId: string;
  userId: string;
  isFriend: boolean;
  isOnline: boolean;
}

export const UserTab: FC<Props> = ({ name, friendId, userId, isFriend, isOnline, ...props }) => {
  return (
    <Tab {...props}>
      <div className="flex gap-2 overflow-hidden">
        <AvatarImage userId={friendId} name={name} isOnline={isOnline} isOpenable={false} />
        <h3 className="tab__info_name ml-2">{name}</h3>
      </div>
      <div className="ml-1 flex gap-2">
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
