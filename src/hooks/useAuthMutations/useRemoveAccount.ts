import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KyResponse } from 'ky';
import userService from 'API/services/UserService/UserService';
import { useSocketStore } from 'store/socket/socketStore';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import { WEBSOCKET_EVENTS } from 'types/types';
import { routes } from 'router/routes';
import { toast } from 'react-toastify';

export const useRemoveAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const socket = useSocketStore((state) => state.socket);
  const setIsSettingsOpened = useAppSettingsStore((state) => state.setIsSettingsOpened);

  return useMutation<KyResponse, Error, { userId: string }>({
    mutationKey: ['removeAccount'],
    mutationFn: ({ userId }) => userService.removeAccount(userId),
    onSuccess: (data, { userId }) => {
      setIsSettingsOpened(false);
      if (socket) socket.emit(WEBSOCKET_EVENTS.DISCONNECT_USER, userId);
      navigate(`/${routes.registration}`, { replace: true });
      queryClient.clear();
      toast.info('You have removed your account!');
    },
    onError: () => {
      toast.error('An error occurred during removing account!');
    },
    retry: false,
  });
};
