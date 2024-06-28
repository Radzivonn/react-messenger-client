import { useQuery } from '@tanstack/react-query';
import userService from '../../API/services/userService/userService';

export const useUserData = () => {
  return useQuery({
    queryKey: ['userData'],
    queryFn: () => userService.getUserData(),
    staleTime: 60000, // 60 seconds
    retry: false,
  });
};
