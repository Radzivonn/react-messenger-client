import { ComponentProps, FC, useRef } from 'react';
import './style.scss';
import { SettingsHeader } from './components/SettingsHeader/SettingsHeader';
import { UserData } from './components/UserData/UserData';
import { useClickOutside } from 'hooks/useClickOutside/useClickOutside';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';

export const SettingsPopup: FC<ComponentProps<'section'>> = ({ className }) => {
  const settingsRef = useRef(null);
  const setIsSettingsOpened = useAppSettingsStore((state) => state.setIsSettingsOpened);

  const closeSettings = () => {
    setIsSettingsOpened(false);
  };

  useClickOutside(settingsRef, closeSettings);

  return (
    <section className={`popup-wrapper ${className}`}>
      <div className="popup-content" ref={settingsRef}>
        <SettingsHeader />
        <UserData />
      </div>
    </section>
  );
};
