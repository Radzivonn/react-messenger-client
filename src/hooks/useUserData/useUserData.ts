import { useQuery } from '@tanstack/react-query';
import UserService from '../../API/services/UserService/UserService';

export const useUserData = () => {
  return useQuery({
    queryKey: ['userData'],
    queryFn: () => UserService.getUserData(),
    staleTime: Infinity,
    retry: 0,
  });
};
