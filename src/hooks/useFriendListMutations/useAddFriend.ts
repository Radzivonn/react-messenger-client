import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserService from '../../API/services/UserService/UserService';
import { toast } from 'react-toastify';

export const useAddFriend = (userId: string, friendId: string, friendName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addFriend', userId, friendId],
    mutationFn: () => UserService.addFriend(userId, friendId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['friendList', userId] });
      toast.success(`${friendName} added to your friend list`);
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: ['userData'] });
      toast.error(`Adding error occurs!`);
    },
    retry: false,
  });
};
