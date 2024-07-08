import { useEffect } from 'react';
import { WEBSOCKET_EVENTS } from '../../types/types';
import { useSearchParams } from 'react-router-dom';
import { useSocketStore } from '../../store/socket/socketStore';
import { useChatStore } from '../../store/chatData/chatData';

const useChat = (userId: string) => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('chatId');
  const receiverId = searchParams.get('receiverId');

  const socket = useSocketStore((state) => state.socket);
  const clearChatData = useChatStore((state) => state.clearChatData);

  useEffect(() => {
    if (socket && chatId && receiverId) {
      socket.emit(WEBSOCKET_EVENTS.JOIN_ROOM, {
        chatId,
        userId,
        receiverId,
      });

      return () => {
        clearChatData();
      };
    }
  }, [chatId]);
};

export default useChat;
