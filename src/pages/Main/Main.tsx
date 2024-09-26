import { ComponentProps, FC } from 'react';
import './style.scss';
import { Outlet, useBeforeUnload, useParams, useSearchParams } from 'react-router-dom';
import { WEBSOCKET_EVENTS } from 'types/types';
import { NavigationSidebar } from 'modules/Main/NavigationSidebar/NavigationSidebar';
import { Sidebar } from 'modules/Main/Sidebar/Sidebar';
import { Chat } from 'modules/Chat/Chat';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import useWindowResizeHandler from 'hooks/useWindowResizeHandler/useWindowResizeHandler';
import useSocketSetup from 'hooks/useSocket/useSocketSetup';
import { useSocketStore } from 'store/socket/socketStore';
import { SettingsPopup } from 'modules/Main/SettingsPopup/SettingsPopup';

type userSearchParams = { id: string; name: string };

export const Main: FC<ComponentProps<'main'>> = () => {
  // * id and name can't be undefined because RequireAuth hoc check id before going to this route
  const { id, name } = useParams() as Readonly<userSearchParams>;
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('chatId');

  const { isMobile, isChatOpened } = useAppSettingsStore();
  const socket = useSocketStore((state) => state.socket);

  const isSidebarOpened = isMobile && isChatOpened ? false : true;
  const isTextHintShow = !isMobile && (!isChatOpened || !chatId) ? true : false;

  useBeforeUnload(() => {
    if (socket) {
      if (chatId) socket.emit(WEBSOCKET_EVENTS.STOP_TYPING, chatId, id);
      socket.emit(WEBSOCKET_EVENTS.DISCONNECT_USER, id);
    }
  });
  useWindowResizeHandler();
  useSocketSetup(id, name, chatId);

  return (
    <>
      <main className="main-page" data-testid="main-page">
        <div className="main-page__content">
          <NavigationSidebar />
          {isSidebarOpened && (
            <Sidebar>
              <Outlet context={{ userId: id, userName: name }} />
            </Sidebar>
          )}
          {isChatOpened && chatId && <Chat chatId={chatId} userId={id} userName={name} />}
          {isTextHintShow && <h2 className="text-hint">Select a chat to start messaging</h2>}
        </div>
      </main>
      <SettingsPopup />
    </>
  );
};
