import { useQuery } from '@tanstack/react-query';
import friendListService from 'API/services/FriendListService/FriendListService';

export const useFriendList = (userId: string) => {
  return useQuery({
    queryKey: ['friendList', userId],
    queryFn: () => friendListService.getFriends(userId),
    staleTime: 60000, // 60 seconds
    retry: false,
  });
};
