import React, { ComponentProps, FC } from 'react';
import './style.scss';
import { TailSpinner } from '../../components/UI/Loaders/TailSpinner';
import { FriendDataHeader } from './components/FriendDataHeader/FriendDataHeader';
import { MessagesList } from './components/MessagesList';
import { InputSection } from './components/InputSection';
import useChat from '../../hooks/useChat/useChat';
import { useChatStore } from '../../store/chatData/chatData';
import { useSocketStore } from '../../store/socket/socketStore';

interface Props extends ComponentProps<'section'> {
  chatId: string;
  userId: string;
  userName: string;
}

export const Chat: FC<Props> = ({ chatId, userId, userName }) => {
  const currentChat = useChatStore((state) => state.currentChat);
  const socket = useSocketStore((state) => state.socket);

  useChat(userId);

  if (!currentChat || !socket) {
    return (
      <section className="chat-wrapper">
        <TailSpinner />
      </section>
    );
  }

  const receiver = currentChat.participants.find((user) => user.userId !== userId);

  return (
    <section className="chat-wrapper">
      <FriendDataHeader
        receiverId={receiver?.userId ?? ''}
        receiverName={receiver?.userName ?? 'NoName'}
      />
      <MessagesList messages={currentChat.messages} userName={userName} />
      <InputSection socket={socket} chatId={chatId} userId={userId} userName={userName} />
    </section>
  );
};
