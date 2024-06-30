import { useEffect } from 'react';
import { useChatSettingsStore } from '../../store/chatSettings/chatSettingsStore';

const useWindowResizeHandler = (isChatActive: boolean, MOBILE_BREAKPOINT = 768) => {
  const { setIsMobile, setIsChatOpened } = useChatSettingsStore();

  const resizeHandler = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const isCurrentMobile = window.innerWidth < MOBILE_BREAKPOINT;
    setIsMobile(isCurrentMobile);

    if (isChatActive) setIsChatOpened(true);

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);
};

export default useWindowResizeHandler;
