import { useEffect } from 'react';
import { useSocketStore } from '../../store/socket/socketStore';
import { WEBSOCKET_EVENTS } from '../../types/types';
import { useChatStore } from '../../store/chatData/chatData';

const useChat = (chatId: string, userId: string, receiverId: string, receiverName: string) => {
  const socket = useSocketStore((state) => state.socket);
  const clearChatData = useChatStore((state) => state.clearChatData);

  useEffect(() => {
    // TODO presumably don not need this check because Main component already has socket check
    if (socket) {
      socket.emit(WEBSOCKET_EVENTS.JOIN_ROOM, {
        chatId,
        userId,
        receiverId,
        receiverName,
      });
      return () => {
        clearChatData();
        socket.emit(WEBSOCKET_EVENTS.LEAVE_ROOM, chatId);
      };
    }
  }, [chatId]);
};

export default useChat;
