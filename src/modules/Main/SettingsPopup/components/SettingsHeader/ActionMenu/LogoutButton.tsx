import { ComponentProps, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSocketStore } from 'store/socket/socketStore';
import { Button } from 'components/UI/Button/Button';
import authService from 'API/services/AuthService/AuthService';
import LogoutIcon from '../../assets/logout-icon.svg?react';
import { WEBSOCKET_EVENTS } from 'types/types';
import { routes } from 'router/routes';
import { toast } from 'react-toastify';
import { useUserData } from 'hooks/useUserData/useUserData';
import { TailSpinner } from 'components/UI/Loaders/TailSpinner';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';

export const LogoutButton: FC<ComponentProps<'button'>> = ({ className, children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const socket = useSocketStore((state) => state.socket);
  const setIsSettingsOpened = useAppSettingsStore((state) => state.setIsSettingsOpened);
  const { isFetching, data } = useUserData();

  const onLogout = async (userId: string) => {
    try {
      await authService.logout(userId);

      setIsSettingsOpened(false);
      if (socket) socket.emit(WEBSOCKET_EVENTS.DISCONNECT_USER, userId);
      authService.removeAccessToken();

      navigate(`/${routes.login}`, { replace: true });

      queryClient.clear();
      toast.info('You are logged out!');
    } catch (e) {
      toast.error(`An error occurred: ${e}`);
    }
  };

  if (isFetching || !data) return <TailSpinner />;

  return (
    <Button className={className} onClick={() => onLogout(data.id)}>
      <LogoutIcon stroke="var(--red-selection)" />
      {children}
    </Button>
  );
};
