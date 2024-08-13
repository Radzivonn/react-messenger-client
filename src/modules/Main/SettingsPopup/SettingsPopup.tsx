import React, { ComponentProps, FC } from 'react';
import './style.scss';
import { SettingsHeader } from './components/SettingsHeader';
import { UserData } from './components/UserData/UserData';

export const SettingsPopup: FC<ComponentProps<'section'>> = ({ className }) => {
  return (
    <section className={`popup-wrapper ${className}`}>
      <div className="popup-content">
        <SettingsHeader />
        <UserData />
      </div>
    </section>
  );
};
