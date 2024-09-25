import { useEffect } from 'react';
import { IChat, WEBSOCKET_EVENTS } from 'types/types';
import { useSearchParams } from 'react-router-dom';
import { useSocketStore } from 'store/socket/socketStore';
import { useReceiverStore } from 'store/receiver/receiverStore';

const useChat = (chatId: string, userId: string, currentChat: IChat) => {
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get('receiverId');

  const socket = useSocketStore((state) => state.socket);
  const setIsReceiverTyping = useReceiverStore((state) => state.setIsReceiverTyping);

  useEffect(() => {
    if (socket && receiverId && !currentChat) {
      socket.emit(WEBSOCKET_EVENTS.CREATE_CHAT, {
        chatId,
        userId,
        receiverId,
      });
    }
    /* when leave chat */
    return () => {
      setIsReceiverTyping(false);
    };
  }, [chatId, currentChat]);
};

export default useChat;
