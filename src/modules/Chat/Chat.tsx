import React, { ComponentProps, FC } from 'react';
import './style.scss';
import { TailSpinner } from '../../components/UI/Spinners/TailSpinner';
import { FriendDataHeader } from './FriendDataHeader/FriendDataHeader';
import { MessagesList } from './MessagesList';
import { InputSection } from './InputSection';
import useChat from '../../hooks/useChat/useChat';
import { useChatStore } from '../../store/chatData/chatData';

interface Props extends ComponentProps<'section'> {
  chatId: string;
  userId: string;
  userName: string;
  receiverId: string;
  receiverName: string;
}

export const Chat: FC<Props> = ({ chatId, userId, userName, receiverId, receiverName }) => {
  const currentChat = useChatStore((state) => state.currentChat);

  useChat(chatId, userId, receiverId, receiverName);

  return (
    <section className="chat-wrapper">
      {currentChat ? (
        <>
          <FriendDataHeader receiverName={receiverName} />
          <MessagesList messages={currentChat.messages} />
          <InputSection chatId={currentChat.chatId} userName={userName} />
        </>
      ) : (
        <TailSpinner />
      )}
    </section>
  );
};
