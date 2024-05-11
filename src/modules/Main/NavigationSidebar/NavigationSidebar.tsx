import React from 'react';
import { Button } from '../../../components/UI/Button/Button';
import AuthService from '../../../API/services/AuthService/AuthService';
import ChatIcon from './assets/chat-icon.svg?react';
import FriendsIcon from './assets/friends-icon.svg?react';
import LogoutIcon from './assets/logout-icon.svg?react';

import './style.scss';

export const NavigationSidebar = () => {
  const onLogout = async () => {
    const status = (await AuthService.logout())?.status;
    if (status === 204) {
      AuthService.removeAccessToken();
      console.log('Logged out');
    }
  };

  return (
    <aside className="sidebar">
      <Button accent className="form__button button--icon-only">
        <ChatIcon className="icon" />
      </Button>
      <Button accent className="form__button button--icon-only">
        <FriendsIcon className="icon" />
      </Button>
      <Button accent className="form__button button--icon-only" onClick={onLogout}>
        <LogoutIcon className="icon" />
      </Button>
    </aside>
  );
};
