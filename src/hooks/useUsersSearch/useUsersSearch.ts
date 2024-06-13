import { useQuery } from '@tanstack/react-query';
import UserService from '../../API/services/UserService/UserService';

export const useUsersSearch = (userId: string, search: string) => {
  return useQuery({
    queryKey: ['usersSearchData', userId, search],
    queryFn: () => UserService.searchUsers(userId, search),
    staleTime: 60000, // 60 sec
    retry: 1,
    enabled: search !== '',
  });
};
