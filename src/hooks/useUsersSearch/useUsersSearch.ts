import { useQuery } from '@tanstack/react-query';
import friendListService from 'API/services/FriendListService/FriendListService';

export const useUsersSearch = (userId: string, search: string) => {
  return useQuery({
    queryKey: ['usersSearchData', userId, search],
    queryFn: () => friendListService.searchUsers(userId, search),
    staleTime: 30000, // 30 seconds
    retry: 1,
    enabled: search !== '',
  });
};
