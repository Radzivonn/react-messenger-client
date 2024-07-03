import React, { FC } from 'react';
import { Button } from '../UI/Button/Button';
import WriteToFriendIcon from '../../assets/icons/write-pencil.svg?react';
import { useSearchParams } from 'react-router-dom';
import { IWriteToFriendButtonProps } from './types';
import { useChatSettingsStore } from '../../store/chatSettings/chatSettingsStore';

const getCombinedId = (userId: string, friendId: string) =>
  userId > friendId ? userId + friendId : friendId + userId;

export const WriteToFriendButton: FC<IWriteToFriendButtonProps> = ({
  userId,
  friendId,
  friendName,
  isOnline,
}) => {
  const setIsChatOpened = useChatSettingsStore((state) => state.setIsChatOpened);
  const [_searchParams, setSearchParams] = useSearchParams();
  const chatId = getCombinedId(userId, friendId);

  const onClickToOpenChat = () => {
    setSearchParams({
      chatId,
      receiverId: friendId,
      receiverName: friendName,
      isOnline: isOnline.toString(),
    });
    setIsChatOpened(true);
  };

  return (
    <Button accent className="form__button button--icon-only" onClick={() => onClickToOpenChat()}>
      <WriteToFriendIcon className="icon" />
    </Button>
  );
};
