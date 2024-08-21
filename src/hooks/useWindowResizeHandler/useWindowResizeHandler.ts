import { useEffect } from 'react';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';

const useWindowResizeHandler = (MOBILE_BREAKPOINT = 768) => {
  const { setIsMobile } = useAppSettingsStore();

  // TODO fix: A lot of state changing operations
  const setDeviceType = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    setDeviceType();

    window.addEventListener('resize', setDeviceType);
    return () => window.removeEventListener('resize', setDeviceType);
  }, []);
};

export default useWindowResizeHandler;
