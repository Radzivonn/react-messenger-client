import { useQuery } from '@tanstack/react-query';
import UserService from '../../API/services/UserService/UserService';

export const useFriendList = (userId: string) => {
  return useQuery({
    queryKey: ['friendList', userId],
    queryFn: () => UserService.getFriends(userId),
    staleTime: 60000, // 60 seconds
    retry: false,
  });
};
