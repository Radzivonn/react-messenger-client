import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserService from '../../API/services/UserService/UserService';
import { toast } from 'react-toastify';

export const useRemoveFriend = (userId: string, friendId: string, friendName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['removeFriend', userId, friendId],
    mutationFn: () => UserService.removeFriend(userId, friendId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['friendList', userId] });
      toast.success(`${friendName} removed from your friend list`);
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: ['userData'] });
      toast.error(`Removing error occurs!`);
    },
    retry: false,
  });
};
