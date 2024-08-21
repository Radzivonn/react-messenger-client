import React, { ComponentProps, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSocketStore } from 'store/socket/socketStore';
import { Button } from 'components/UI/Button/Button';
import authService from 'API/services/AuthService/AuthService';
import RecycleBinIcon from '../../assets/recycle-bin-icon.svg?react';
import { WEBSOCKET_EVENTS } from 'types/types';
import { routes } from 'router/routes';
import { toast } from 'react-toastify';
import { useUserData } from 'hooks/useUserData/useUserData';
import { TailSpinner } from 'components/UI/Loaders/TailSpinner';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import userService from 'API/services/UserService/UserService';

export const RemoveAccountButton: FC<ComponentProps<'button'>> = ({ className, children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const socket = useSocketStore((state) => state.socket);
  const setIsSettingsOpened = useAppSettingsStore((state) => state.setIsSettingsOpened);
  const { isFetching, data } = useUserData();

  const onRemove = async (userId: string) => {
    try {
      await userService.removeAccount(userId);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSettingsOpened(false);

      if (socket) socket.emit(WEBSOCKET_EVENTS.DISCONNECT_PARTICIPANT, userId);

      authService.removeAccessToken();
      navigate(`/${routes.registration}`, { replace: true });

      queryClient.clear();

      toast.info('You have removed your account!');
    }
  };

  if (isFetching || !data) return <TailSpinner />;

  return (
    <Button className={className} onClick={() => onRemove(data.id)}>
      <RecycleBinIcon stroke="var(--red-selection)" />
      {children}
    </Button>
  );
};
