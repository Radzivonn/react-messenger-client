import { useQuery } from '@tanstack/react-query';
import chatService from 'API/services/ChatService/ChatService';

export const useEmojiMartData = () => {
  return useQuery({
    queryKey: ['emojiMartData'],
    queryFn: () => chatService.getEmojiMartData(),
    staleTime: Infinity,
    retry: false,
  });
};
