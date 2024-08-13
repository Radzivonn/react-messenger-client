import React, { ComponentProps, FC } from 'react';
import { Button } from '../../../components/UI/Button/Button';
import SettingsIcon from './assets/settings-icon.svg?react';
import ChatIcon from './assets/chat-icon.svg?react';
import FriendsIcon from './assets/friends-icon.svg?react';
import { NavLink, useSearchParams } from 'react-router-dom';
import './style.scss';
import { routes } from '../../../router/routes';
import { LogoutButton } from './components/LogoutButton';
import { useAppSettingsStore } from '../../../store/appSettings/appSettingsStore';

interface Props extends ComponentProps<'aside'> {
  userId: string;
}

export const NavigationSidebar: FC<Props> = ({ userId }) => {
  const [searchParams] = useSearchParams();
  const setIsSettingsOpened = useAppSettingsStore((state) => state.setIsSettingsOpened);

  return (
    <aside className="nav-sidebar">
      <Button className="form__button button--icon-only" onClick={() => setIsSettingsOpened(true)}>
        <SettingsIcon />
      </Button>
      <Button className="form__button button--icon-only">
        <NavLink to={`${routes.chats}?${searchParams.toString()}`}>
          <ChatIcon />
        </NavLink>
      </Button>
      <Button className="form__button button--icon-only">
        <NavLink to={`${routes.friends}?${searchParams.toString()}`}>
          <FriendsIcon />
        </NavLink>
      </Button>
      <LogoutButton userId={userId} />
    </aside>
  );
};
