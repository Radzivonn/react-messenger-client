import React, { ComponentProps, FC } from 'react';
import { Button } from '../../../components/UI/Button/Button';
import AuthService from '../../../API/services/AuthService/AuthService';
import ChatIcon from './assets/chat-icon.svg?react';
import FriendsIcon from './assets/friends-icon.svg?react';
import LogoutIcon from './assets/logout-icon.svg?react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './style.scss';
import { routes } from '../../../router/routes';
import { useQueryClient } from '@tanstack/react-query';

interface Props extends ComponentProps<'aside'> {
  userId: string;
}

export const NavigationSidebar: FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const onLogout = async () => {
    try {
      await AuthService.logout(userId);
    } catch (e) {
      console.error(e);
    } finally {
      AuthService.removeAccessToken();
      void queryClient.invalidateQueries({ queryKey: ['userData'] });
      navigate(`/${routes.login}`, { replace: true });
    }
  };

  return (
    <aside className="nav-sidebar">
      <Button accent className="form__button button--icon-only">
        <Link to={`${routes.chats}?${searchParams.toString()}`}>
          <ChatIcon className="icon" />
        </Link>
      </Button>
      <Button accent className="form__button button--icon-only">
        <Link to={`${routes.friends}?${searchParams.toString()}`}>
          <FriendsIcon className="icon" />
        </Link>
      </Button>
      <Button accent className="form__button button--icon-only" onClick={onLogout}>
        <LogoutIcon className="icon" />
      </Button>
    </aside>
  );
};
