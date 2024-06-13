import { useQuery } from '@tanstack/react-query';
import UserService from '../../API/services/UserService/UserService';

export const useChatList = (userId: string) => {
  return useQuery({
    queryKey: ['chatList', userId],
    queryFn: () => UserService.getUserChats(userId),
    select: (data) => data.filter((chat) => chat.messages.length),
    staleTime: 0,
    retry: 0,
  });
};
