import React from 'react';
import { Button } from '../../../components/UI/Button/Button';
import AuthService from '../../../API/services/AuthService/AuthService';
import ChatIcon from './assets/chat-icon.svg?react';
import FriendsIcon from './assets/friends-icon.svg?react';
import LogoutIcon from './assets/logout-icon.svg?react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './style.scss';
import { routes } from '../../../router/routes';

export const NavigationSidebar = () => {
  const navigate = useNavigate();

  const { id } = useParams() as { id: string };

  const onLogout = async () => {
    try {
      await AuthService.logout(id);
    } catch (e) {
      console.error(e);
    } finally {
      AuthService.removeAccessToken();
      navigate(`/${routes.login}`, { replace: true });
    }
  };

  return (
    <aside className="nav-sidebar">
      <Button accent className="form__button button--icon-only">
        <Link to={routes.chats}>
          <ChatIcon className="icon" />
        </Link>
      </Button>
      <Button accent className="form__button button--icon-only">
        <Link to={routes.friends}>
          <FriendsIcon className="icon" />
        </Link>
      </Button>
      <Button accent className="form__button button--icon-only" onClick={onLogout}>
        <LogoutIcon className="icon" />
      </Button>
    </aside>
  );
};
