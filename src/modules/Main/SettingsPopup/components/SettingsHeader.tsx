import React from 'react';
import { useAppSettingsStore } from '../../../../store/appSettings/appSettingsStore';

export const SettingsHeader = ({}) => {
  const setIsSettingsOpened = useAppSettingsStore((state) => state.setIsSettingsOpened);
  return (
    <div className="popup-header">
      <h2>Settings</h2>
      <div id="cross" onClick={() => setIsSettingsOpened(false)}></div>
    </div>
  );
};
