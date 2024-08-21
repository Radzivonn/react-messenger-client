import { useEffect } from 'react';
import { WEBSOCKET_EVENTS } from 'types/types';
import { useSearchParams } from 'react-router-dom';
import { useSocketStore } from 'store/socket/socketStore';
import { useChatStore } from 'store/chatData/chatData';
import { useReceiverStore } from 'store/receiver/receiverStore';

const useChat = (userId: string) => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('chatId');
  const receiverId = searchParams.get('receiverId');

  const socket = useSocketStore((state) => state.socket);
  const clearChatData = useChatStore((state) => state.clearChatData);
  const setIsReceiverTyping = useReceiverStore((state) => state.setIsReceiverTyping);

  useEffect(() => {
    if (socket && chatId && receiverId) {
      socket.emit(WEBSOCKET_EVENTS.JOIN_ROOM, {
        chatId,
        userId,
        receiverId,
      });

      /* when leave chat */
      return () => {
        setIsReceiverTyping(false);
        clearChatData();
      };
    }
  }, [chatId]);
};

export default useChat;
