import React, { ComponentProps, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSocketStore } from '../../../../store/socket/socketStore';
import { Button } from '../../../../components/UI/Button/Button';
import authService from '../../../../API/services/AuthService/AuthService';
import LogoutIcon from '../assets/logout-icon.svg?react';
import { WEBSOCKET_EVENTS } from '../../../../types/types';
import { routes } from '../../../../router/routes';
import { toast } from 'react-toastify';

interface Props extends ComponentProps<'button'> {
  userId: string;
}

export const LogoutButton: FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const socket = useSocketStore((state) => state.socket);

  const onLogout = async () => {
    try {
      await authService.logout(userId);
    } catch (e) {
      console.error(e);
    } finally {
      if (socket) socket.emit(WEBSOCKET_EVENTS.DISCONNECT_PARTICIPANT, userId);

      authService.removeAccessToken();
      navigate(`/${routes.login}`, { replace: true });

      void queryClient.invalidateQueries({ queryKey: ['userData'] });
      void queryClient.invalidateQueries({ queryKey: ['chatList', userId] });

      toast.info('You are logged out!');
    }
  };

  return (
    <Button className="form__button button--icon-only" onClick={onLogout}>
      <LogoutIcon className="icon" />
    </Button>
  );
};
