import React, { ComponentProps, FC } from 'react';
import { Button } from '../../../components/UI/Button/Button';
import ChatIcon from './assets/chat-icon.svg?react';
import FriendsIcon from './assets/friends-icon.svg?react';
import { NavLink, useSearchParams } from 'react-router-dom';
import './style.scss';
import { routes } from '../../../router/routes';
import { LogoutButton } from './components/LogoutButton';

interface Props extends ComponentProps<'aside'> {
  userId: string;
}

export const NavigationSidebar: FC<Props> = ({ userId }) => {
  const [searchParams] = useSearchParams();

  return (
    <aside className="nav-sidebar">
      <Button className="form__button button--icon-only">
        <NavLink to={`${routes.chats}?${searchParams.toString()}`}>
          <ChatIcon className="icon" />
        </NavLink>
      </Button>
      <Button className="form__button button--icon-only">
        <NavLink to={`${routes.friends}?${searchParams.toString()}`}>
          <FriendsIcon className="icon" />
        </NavLink>
      </Button>
      <LogoutButton userId={userId} />
    </aside>
  );
};
