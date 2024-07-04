import React, { ComponentProps, FC } from 'react';
import './style.scss';
import { TailSpinner } from '../../components/UI/Spinners/TailSpinner';
import { FriendDataHeader } from './FriendDataHeader/FriendDataHeader';
import { MessagesList } from './MessagesList';
import { InputSection } from './InputSection';
import useChat from '../../hooks/useChat/useChat';
import { useChatStore } from '../../store/chatData/chatData';

interface Props extends ComponentProps<'section'> {
  userId: string;
  userName: string;
}

export const Chat: FC<Props> = ({ userId, userName }) => {
  const currentChat = useChatStore((state) => state.currentChat);

  useChat(userId);

  return (
    <section className="chat-wrapper">
      {currentChat ? (
        <>
          <FriendDataHeader
            receiverName={
              currentChat.participants.find((user) => user.userId !== userId)?.userName ?? 'NoName'
            }
          />
          <MessagesList messages={currentChat.messages} />
          <InputSection chatId={currentChat.chatId} userName={userName} />
        </>
      ) : (
        <TailSpinner />
      )}
    </section>
  );
};
