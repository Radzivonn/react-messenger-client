import React, { ComponentProps, FC, useState } from 'react';
import './style.scss';
import { Message } from '../../types/types';
import { useUserData } from '../../hooks/useUserData/useUserData';
import useSocketSetup from '../../hooks/useSocket/useSocketSetup';
import { TailSpinner } from '../../components/UI/Spinners/TailSpinner';
import { FriendDataHeader } from './FriendDataHeader';
import { MessagesList } from './MessagesList';
import { InputSection } from './InputSection';

interface Props extends ComponentProps<'section'> {
  userId: string;
  receiverId: string;
  receiverName: string;
  chatId: string;
}

export const Chat: FC<Props> = ({ userId, receiverId, receiverName, chatId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { isFetching, data } = useUserData();

  useSocketSetup(userId, receiverId, chatId, setMessages);

  if (isFetching || !data) return <TailSpinner />;

  return (
    <section className="chat-wrapper">
      <FriendDataHeader receiverName={receiverName} />
      <MessagesList messages={messages} />
      <InputSection chatId={chatId} userName={data.name} />
    </section>
  );
};
