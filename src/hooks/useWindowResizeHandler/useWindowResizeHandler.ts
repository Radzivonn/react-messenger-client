import { useEffect } from 'react';
import { useChatSettingsStore } from '../../store/chatSettings/chatSettingsStore';

const useWindowResizeHandler = (MOBILE_BREAKPOINT = 768) => {
  const { setIsMobile } = useChatSettingsStore();

  // TODO fix: A lot of state changing operations
  const setDeviceType = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    setDeviceType();

    window.addEventListener('resize', setDeviceType);
    return () => window.removeEventListener('resize', setDeviceType);
  }, []);
};

export default useWindowResizeHandler;
