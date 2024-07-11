import React, { FC } from 'react';
import { Button } from '../UI/Button/Button';
import AddFriendIcon from '../../assets/icons/add-friend-icon.svg?react';
import { IFriendListActionButtonProps } from './types';
import { useAddFriend } from '../../hooks/useFriendListMutations/useAddFriend';
import { TailSpinner } from '../UI/Loaders/TailSpinner';

export const AddFriendButton: FC<IFriendListActionButtonProps> = ({
  userId,
  friendId,
  friendName,
}) => {
  const { isPending, mutate } = useAddFriend(userId, friendId, friendName);

  if (isPending) return <TailSpinner width="30" height="30" wrapperStyle={{ margin: '0' }} />;

  return (
    <Button accent className="form__button button--icon-only" onClick={() => mutate()}>
      <AddFriendIcon className="icon" />
    </Button>
  );
};
