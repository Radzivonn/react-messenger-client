import { useQuery } from '@tanstack/react-query';
import userService from '../../API/services/UserService/UserService';

export const useAvatarImage = (userId: string) => {
  return useQuery({
    queryKey: [userId, 'avatarImage'],
    queryFn: () => userService.getAvatarImage(userId),
    staleTime: Infinity,
    retry: false,
  });
};
