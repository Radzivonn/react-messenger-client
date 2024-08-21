import React, { useRef, useState } from 'react';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import { ActionMenu } from './ActionMenu/ActionMenu';
import { useClickOutside } from 'hooks/useClickOutside/useClickOutside';

export const SettingsHeader = () => {
  const menuRef = useRef(null);
  const [isActionMenuOpened, setIsActionMenuOpened] = useState(false);
  const setIsSettingsOpened = useAppSettingsStore((state) => state.setIsSettingsOpened);

  const closeMenu = () => {
    setIsActionMenuOpened(false);
  };

  useClickOutside(menuRef, closeMenu);

  return (
    <div className="popup-header">
      <h2>Settings</h2>
      <div className="popup-header__buttons">
        <div className="action-menu__icon" onClick={() => setIsActionMenuOpened(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {isActionMenuOpened && <ActionMenu ref={menuRef} />}
        <div id="cross" onClick={() => setIsSettingsOpened(false)}></div>
      </div>
    </div>
  );
};
