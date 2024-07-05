import React, { ComponentProps, FC } from 'react';
import './style.scss';
import { Outlet, useBeforeUnload, useParams } from 'react-router-dom';
import { NavigationSidebar } from '../../modules/Main/NavigationSidebar/NavigationSidebar';
import { Sidebar } from '../../modules/Main/Sidebar/Sidebar';
import { Chat } from '../../modules/Chat/Chat';
import { useChatSettingsStore } from '../../store/chatSettings/chatSettingsStore';
import useWindowResizeHandler from '../../hooks/useWindowResizeHandler/useWindowResizeHandler';
import useSocketSetup from '../../hooks/useSocket/useSocketSetup';
import { useChangeOnlineStatus } from '../../hooks/useUserData/useChangeOnlineStatus';

type userSearchParams = { id: string; name: string };

export const Main: FC<ComponentProps<'main'>> = () => {
  // * id and name can't be undefined because RequireAuth hoc check id before going to this route
  const { id, name } = useParams() as Readonly<userSearchParams>;

  const { mutate: changeOnlineStatus } = useChangeOnlineStatus(id);

  const { isMobile, isChatOpened } = useChatSettingsStore();

  const isSidebarOpened = isMobile && isChatOpened ? false : true;

  useBeforeUnload(() => changeOnlineStatus(false));
  useWindowResizeHandler();
  useSocketSetup(id);

  return (
    <main className="main-page">
      <div className="main-page__content">
        <NavigationSidebar userId={id} />
        {isSidebarOpened && (
          <Sidebar>
            <Outlet context={{ userId: id, userName: name }} />
          </Sidebar>
        )}
        {isChatOpened ? (
          <Chat userId={id} userName={name} />
        ) : (
          !isMobile && <h2 className="text-hint">Select a chat to start messaging</h2>
        )}
      </div>
    </main>
  );
};
