import React, { ComponentProps, FC } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { NavigationSidebar } from '../../modules/Main/NavigationSidebar/NavigationSidebar';
import { Sidebar } from '../../modules/Main/Sidebar/Sidebar';
import './style.scss';
import { Chat } from '../../modules/Chat/Chat';

type userIdSearchParams = { id: string };

export const Main: FC<ComponentProps<'main'>> = () => {
  // * id can't be undefined because RequireAuth hoc check id before going to this route
  const { id } = useParams() as Readonly<userIdSearchParams>;

  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('chatId');
  const receiverId = searchParams.get('receiverId');
  const receiverName = searchParams.get('receiverName');
  const isChatOpened = !!(chatId && receiverId && receiverName);

  return (
    <main className="main-page">
      <div className="main-page__content">
        <NavigationSidebar userId={id} />
        <Sidebar>
          <Outlet context={{ userId: id }} />
        </Sidebar>
        {isChatOpened && (
          <Chat userId={id} receiverId={receiverId} receiverName={receiverName} chatId={chatId} />
        )}
      </div>
    </main>
  );
};
