import { useEffect } from 'react';
import { useSocketStore } from '../../store/socket/socketStore';
import { WEBSOCKET_EVENTS } from '../../types/types';
import { useSearchParams } from 'react-router-dom';

const useChat = (userId: string) => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('chatId');
  const receiverId = searchParams.get('receiverId');

  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (socket && chatId && receiverId) {
      socket.emit(WEBSOCKET_EVENTS.JOIN_ROOM, {
        chatId,
        userId,
        receiverId,
      });
      return () => {
        socket.emit(WEBSOCKET_EVENTS.LEAVE_ROOM, chatId);
      };
    }
  }, [chatId]);
};

export default useChat;
