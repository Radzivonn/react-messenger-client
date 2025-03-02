import { useQuery } from '@tanstack/react-query';
import friendListService from 'API/services/FriendListService/FriendListService';

export const useUsersSearch = (userId: string, search: string) => {
  return useQuery({
    queryKey: ['usersSearchData', userId, search],
    queryFn: () => friendListService.searchUsers(userId, search),
    staleTime: 60 * 1000, // 1 minute
    retry: 1,
    enabled: search !== '',
  });
};
