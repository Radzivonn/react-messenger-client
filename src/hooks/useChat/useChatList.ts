import { useQuery } from '@tanstack/react-query';
import chatService from '../../API/services/ChatService/ChatService';

export const useChatList = (userId: string, userName: string) => {
  return useQuery({
    queryKey: ['chatList', userId],
    queryFn: () => chatService.getUserChats(userId, userName),
    select: (data) => data.filter((chat) => chat.messages.length),
    staleTime: 60000, // 60 seconds
    retry: false,
  });
};
