import { ComponentProps, FC } from 'react';
import { PopupContent } from './components/PopupContent';
import './style.scss';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';

export const SettingsPopup: FC<ComponentProps<'section'>> = () => {
  const isSettingsOpened = useAppSettingsStore((state) => state.isSettingsOpened);

  return (
    <section className={`popup-wrapper ${isSettingsOpened ? '' : 'popup-wrapper--closed'}`}>
      {isSettingsOpened && <PopupContent />}
    </section>
  );
};
