import React, { ComponentProps, FC } from 'react';
import './style.scss';
import { Outlet, useBeforeUnload, useParams, useSearchParams } from 'react-router-dom';
import { NavigationSidebar } from '../../modules/Main/NavigationSidebar/NavigationSidebar';
import { Sidebar } from '../../modules/Main/Sidebar/Sidebar';
import { Chat } from '../../modules/Chat/Chat';
import { useChatSettingsStore } from '../../store/chatSettings/chatSettingsStore';
import useWindowResizeHandler from '../../hooks/useWindowResizeHandler/useWindowResizeHandler';
import useSocketSetup from '../../hooks/useSocket/useSocketSetup';
import { useSocketStore } from '../../store/socket/socketStore';
import { useChangeOnlineStatus } from '../../hooks/useUserData/useChangeOnlineStatus';

type userSearchParams = { id: string; name: string };

export const Main: FC<ComponentProps<'main'>> = () => {
  // * id and name can't be undefined because RequireAuth hoc check id before going to this route
  const { id, name } = useParams() as Readonly<userSearchParams>;
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('chatId');
  const receiverId = searchParams.get('receiverId');
  const receiverName = searchParams.get('receiverName');

  const { mutate: changeOnlineStatus } = useChangeOnlineStatus(id);

  const socket = useSocketStore((state) => state.socket);
  const { isMobile, isChatOpened } = useChatSettingsStore();

  const isChatActive = !!(chatId && receiverId && receiverName && socket && isChatOpened);
  const isSidebarActive = !(isMobile && isChatActive && isChatOpened);

  useBeforeUnload(() => changeOnlineStatus(false));
  useWindowResizeHandler();
  useSocketSetup(id);

  return (
    <main className="main-page">
      <div className="main-page__content">
        <NavigationSidebar userId={id} />
        {isSidebarActive && (
          <Sidebar>
            <Outlet context={{ userId: id, userName: name }} />
          </Sidebar>
        )}
        {isChatActive ? (
          <Chat
            chatId={chatId}
            userId={id}
            userName={name}
            receiverId={receiverId}
            receiverName={receiverName}
          />
        ) : (
          !isMobile && <h2 className="text-hint">Select a chat to start messaging</h2>
        )}
      </div>
    </main>
  );
};
