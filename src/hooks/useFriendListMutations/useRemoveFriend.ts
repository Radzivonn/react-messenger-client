import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserService from '../../API/services/UserService/UserService';

export const useRemoveFriend = (userId: string, friendId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['removeFriend', userId, friendId],
    mutationFn: () => UserService.removeFriend(userId, friendId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['friendList', userId] }),
    retry: 1,
  });
};
