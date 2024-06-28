import { useQuery } from '@tanstack/react-query';
import UserService from '../../API/services/UserService/UserService';

export const useUserData = () => {
  return useQuery({
    queryKey: ['userData'],
    queryFn: () => UserService.getUserData(),
    staleTime: 60000, // 60 seconds
    retry: false,
  });
};
