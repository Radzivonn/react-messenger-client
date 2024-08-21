import React, { FC } from 'react';
import { Button } from '../UI/Button/Button';
import RemoveFriendIcon from '../../assets/icons/remove-friend-icon.svg?react';
import { IFriendListActionButtonProps } from './types';
import { useRemoveFriend } from '../../hooks/useFriendListMutations/useRemoveFriend';
import { TailSpinner } from '../UI/Loaders/TailSpinner';

export const RemoveFriendButton: FC<IFriendListActionButtonProps> = ({
  userId,
  friendId,
  friendName,
}) => {
  const { isPending, mutate } = useRemoveFriend(userId, friendId, friendName);

  if (isPending) return <TailSpinner width="30" height="30" wrapperStyle={{ margin: '0' }} />;

  return (
    <Button className="form__button button--icon-only" onClick={() => mutate()}>
      <RemoveFriendIcon />
    </Button>
  );
};
