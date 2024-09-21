import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import friendListService from 'API/services/FriendListService/FriendListService';

export const useAddFriend = (userId: string, friendId: string, friendName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addFriend', userId, friendId],
    mutationFn: () => friendListService.addFriend(userId, friendId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['friendList', userId] });
      toast.success(`${friendName} added to your friend list`);
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: ['userData'] });
      toast.error(`Some error occurs!`);
    },
    retry: false,
  });
};
