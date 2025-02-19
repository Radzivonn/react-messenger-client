import { ComponentProps, FC, useRef } from 'react';
import { SettingsHeader } from './SettingsHeader/SettingsHeader';
import { UserData } from './UserData/UserData';
import { useClickOutside } from 'hooks/useClickOutside/useClickOutside';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';

export const PopupContent: FC<ComponentProps<'div'>> = () => {
  const settingsRef = useRef(null);
  const setIsSettingsOpened = useAppSettingsStore((state) => state.setIsSettingsOpened);

  const closeSettings = () => {
    setIsSettingsOpened(false);
  };

  useClickOutside(settingsRef, closeSettings);

  return (
    <div className="popup-content" ref={settingsRef}>
      <SettingsHeader />
      <UserData />
    </div>
  );
};
