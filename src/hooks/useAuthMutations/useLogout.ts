import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KyResponse } from 'ky';
import authService from 'API/services/AuthService/AuthService';
import { useSocketStore } from 'store/socket/socketStore';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import { WEBSOCKET_EVENTS } from 'types/types';
import { routes } from 'router/routes';
import { toast } from 'react-toastify';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const socket = useSocketStore((state) => state.socket);
  const setIsSettingsOpened = useAppSettingsStore((state) => state.setIsSettingsOpened);

  return useMutation<KyResponse, Error, { userId: string }>({
    mutationKey: ['logout'],
    mutationFn: ({ userId }) => authService.logout(userId),
    onSuccess: (data, { userId }) => {
      setIsSettingsOpened(false);
      if (socket) socket.emit(WEBSOCKET_EVENTS.DISCONNECT_USER, userId);
      authService.removeAccessToken();
      navigate(`/${routes.login}`, { replace: true });
      queryClient.clear();
      toast.info('You are logged out!');
    },
    onError: () => {
      toast.error('An error occurred during logout!');
    },
    retry: false,
  });
};
