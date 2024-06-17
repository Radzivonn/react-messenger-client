import React, { FC } from 'react';
import { Button } from '../UI/Button/Button';
import WriteToFriendIcon from '../../assets/icons/write-pencil.svg?react';
import { useSearchParams } from 'react-router-dom';
import { IFriendListActionButtonProps } from './types';

interface Props extends IFriendListActionButtonProps {
  friendName: string;
}

const getCombinedId = (userId: string, friendId: string) =>
  userId > friendId ? userId + friendId : friendId + userId;

export const WriteToFriendButton: FC<Props> = ({ userId, friendId, friendName }) => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const chatId = getCombinedId(userId, friendId);

  const onClickToOpenChat = () => {
    setSearchParams({ chatId, receiverId: friendId, receiverName: friendName });
  };

  return (
    <Button accent className="form__button button--icon-only" onClick={() => onClickToOpenChat()}>
      <WriteToFriendIcon className="icon" />
    </Button>
  );
};
