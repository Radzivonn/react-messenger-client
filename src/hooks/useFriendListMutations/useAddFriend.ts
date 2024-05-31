import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserService from '../../API/services/UserService/UserService';

export const useAddFriend = (userId: string, friendId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addFriend', userId, friendId],
    mutationFn: () => UserService.addFriend(userId, friendId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['friendList', userId] }),
    retry: 1,
  });
};
