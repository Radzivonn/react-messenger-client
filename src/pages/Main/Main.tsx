import React, { ComponentProps, FC, useEffect } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { NavigationSidebar } from '../../modules/Main/NavigationSidebar/NavigationSidebar';
import { Sidebar } from '../../modules/Main/Sidebar/Sidebar';
import './style.scss';
import { Chat } from '../../modules/Chat/Chat';
import { useChatSettingsStore } from '../../store/chatSettings/chatSettingsStore';

type userIdSearchParams = { id: string };

export const Main: FC<ComponentProps<'main'>> = () => {
  // * id can't be undefined because RequireAuth hoc check id before going to this route
  const { id } = useParams() as Readonly<userIdSearchParams>;

  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('chatId');
  const receiverId = searchParams.get('receiverId');
  const receiverName = searchParams.get('receiverName');
  const { isMobile, setIsMobile, isChatOpened, setIsChatOpened } = useChatSettingsStore();
  const isChatActive = !!(chatId && receiverId && receiverName);
  const isSidebarActive = !(isMobile && isChatActive && isChatOpened);

  const resizeHandler = () => setIsMobile(window.innerWidth < 768);

  useEffect(() => {
    const isCurrentMobile = window.innerWidth < 768;
    setIsMobile(isCurrentMobile);

    if (isChatActive) setIsChatOpened(isChatActive);

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <main className="main-page">
      <div className="main-page__content">
        <NavigationSidebar userId={id} />
        {isSidebarActive && (
          <Sidebar>
            <Outlet context={{ userId: id }} />
          </Sidebar>
        )}
        {isChatActive && isChatOpened ? (
          <Chat userId={id} receiverId={receiverId} receiverName={receiverName} chatId={chatId} />
        ) : (
          !isMobile && <h2 className="text-hint">Select a chat to start messaging</h2>
        )}
      </div>
    </main>
  );
};
