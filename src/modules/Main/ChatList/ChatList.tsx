import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { TailSpinner } from '../../../components/UI/Spinners/TailSpinner';
import routes from '../../../router/routes';
import { ChatTab } from '../../../components/UI/Tabs/Chat-tab';

// !!! temporary using mock data
const data = [
  {
    id: '123',
    name: 'John',
    lastMessage: 'Hello',
    lastMessageTime: '19:01',
  },
  {
    id: '456',
    name: 'Jane',
    lastMessage: 'Hi',
    lastMessageTime: '19:10',
  },
];

export const ChatList = () => {
  //   const { id } = useParams() as { id: string };
  //   const { isPending, data, isError } = useChatList(id);

  //   if (isError) return <Navigate to={`/${routes.login}`} replace />;

  //   if (isPending || !data) return <TailSpinner />;

  return (
    <>
      {data.map((user) => (
        <ChatTab
          key={user.id}
          name={user.name}
          lastMessage={user.lastMessage}
          lastMessageTime={user.lastMessageTime}
        ></ChatTab>
      ))}
    </>
  );
};
// !!! temporary using mock data
