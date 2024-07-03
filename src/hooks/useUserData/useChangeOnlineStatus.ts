import { useMutation } from '@tanstack/react-query';
import userService from '../../API/services/userService/userService';

export const useChangeOnlineStatus = (userId: string) => {
  return useMutation({
    mutationKey: ['userOnlineStatus'],
    mutationFn: (online: boolean) => userService.changeOnlineStatus(userId, online),
    retry: false,
  });
};
