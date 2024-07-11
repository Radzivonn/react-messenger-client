import React, { FC } from 'react';
import { Button } from '../UI/Button/Button';
import WriteToFriendIcon from '../../assets/icons/write-pencil.svg?react';
import { useSearchParams } from 'react-router-dom';
import { IFriendListActionButtonProps } from './types';
import { useAppSettingsStore } from '../../store/appSettings/appSettingsStore';

const getCombinedId = (userId: string, friendId: string) =>
  userId > friendId ? userId + friendId : friendId + userId;

export const WriteToFriendButton: FC<IFriendListActionButtonProps> = ({ userId, friendId }) => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const setIsChatOpened = useAppSettingsStore((state) => state.setIsChatOpened);

  const chatId = getCombinedId(userId, friendId);

  const onClickToOpenChat = () => {
    setSearchParams(
      {
        chatId,
        receiverId: friendId,
      },
      { replace: true },
    );
    setIsChatOpened(true);
  };

  return (
    <Button className="form__button button--icon-only" onClick={() => onClickToOpenChat()}>
      <WriteToFriendIcon className="icon" />
    </Button>
  );
};
