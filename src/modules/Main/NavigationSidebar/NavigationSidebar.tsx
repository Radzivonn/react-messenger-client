import React, { ComponentProps, FC } from 'react';
import { Button } from '../../../components/UI/Button/Button';
import authService from '../../../API/services/authService/authService';
import ChatIcon from './assets/chat-icon.svg?react';
import FriendsIcon from './assets/friends-icon.svg?react';
import LogoutIcon from './assets/logout-icon.svg?react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import './style.scss';
import { routes } from '../../../router/routes';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface Props extends ComponentProps<'aside'> {
  userId: string;
}

export const NavigationSidebar: FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const onLogout = async () => {
    try {
      await authService.logout(userId);
    } catch (e) {
      console.error(e);
    } finally {
      authService.removeAccessToken();
      void queryClient.invalidateQueries({ queryKey: ['userData'] });

      navigate(`/${routes.login}`, { replace: true });

      toast.info('You are logged out!');
    }
  };

  return (
    <aside className="nav-sidebar">
      <Button accent className="form__button button--icon-only">
        <NavLink to={`${routes.chats}?${searchParams.toString()}`}>
          <ChatIcon className="icon" />
        </NavLink>
      </Button>
      <Button accent className="form__button button--icon-only">
        <NavLink to={`${routes.friends}?${searchParams.toString()}`}>
          <FriendsIcon className="icon" />
        </NavLink>
      </Button>
      <Button accent className="form__button button--icon-only" onClick={onLogout}>
        <LogoutIcon className="icon" />
      </Button>
    </aside>
  );
};
