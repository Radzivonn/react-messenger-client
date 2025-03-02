import { useQuery } from '@tanstack/react-query';
import friendListService from 'API/services/FriendListService/FriendListService';

export const useFriendList = (userId: string) => {
  return useQuery({
    queryKey: ['friendList', userId],
    queryFn: () => friendListService.getFriends(userId),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
  });
};
