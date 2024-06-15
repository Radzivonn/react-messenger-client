import React, { ComponentProps, FC } from 'react';
import './style.scss';
import { InputSection } from './InputSection';
import { useUserData } from '../../hooks/useUserData/useUserData';
import { TailSpinner } from '../../components/UI/Spinners/TailSpinner';
import { MessagesList } from './MessagesList';
import { Navigate } from 'react-router-dom';
import { routes } from '../../router/routes';
import { FriendDataHeader } from './FriendDataHeader';

interface Props extends ComponentProps<'section'> {
  userId: string;
  receiverId: string;
  receiverName: string;
  chatId: string;
}

export const Chat: FC<Props> = ({ userId, receiverId, receiverName, chatId }) => {
  const { isFetching, data, isError } = useUserData();

  if (isError) return <Navigate to={`/${routes.login}`} replace />;

  if (isFetching || !data) return <TailSpinner />;

  return (
    <section className="chat-wrapper">
      <FriendDataHeader receiverName={receiverName} />
      <MessagesList userId={userId} receiverId={receiverId} chatId={chatId} />
      <InputSection chatId={chatId} userName={data.name} />
    </section>
  );
};
