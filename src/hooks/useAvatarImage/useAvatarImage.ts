import { useQuery } from '@tanstack/react-query';
import userService from 'API/services/UserService/UserService';

export const useAvatarImage = (userId: string) => {
  return useQuery({
    queryKey: [userId, 'avatarImage'],
    queryFn: () => userService.getAvatarImage(userId),
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: false,
  });
};
