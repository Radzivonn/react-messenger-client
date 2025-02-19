import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { WEBSOCKET_EVENTS } from 'types/types';
import { ServerToClientEvents, ClientToServerEvents } from 'types/types';
import { useSocketStore } from 'store/socket/socketStore';
import { useChatStore } from 'store/chat/chatStore';
import { useFriendsOnlineStatusesStore } from 'store/onlineStatuses/onlineStatusesStore';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import { useReceiverStore } from 'store/receiver/receiverStore';
import { useSearchParams } from 'react-router-dom';
import { toastMessage } from './ToastMessageNotification';

const useSocketSetup = (userId: string, userName: string, currentChatId: string | null) => {
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get('receiverId');

  const { socket, setSocket, resetSocket } = useSocketStore();
  const { setChats, addChat, clearChatsData, addMessage } = useChatStore();
  const { addOnlineStatus, setOnlineStatuses } = useFriendsOnlineStatusesStore();
  const setIsChatOpened = useAppSettingsStore((state) => state.setIsChatOpened);
  const setIsReceiverTyping = useReceiverStore((state) => state.setIsReceiverTyping);

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:5050/');

    socket.on(WEBSOCKET_EVENTS.CONNECTION, () => {
      socket.emit(WEBSOCKET_EVENTS.CONNECT_USER, userId, userName);
      setSocket(socket);
    });

    socket.on(WEBSOCKET_EVENTS.SOCKET_SUCCESSFULLY_CONNECTED, (friendsOnlineStatuses, chats) => {
      setOnlineStatuses(friendsOnlineStatuses);
      setChats(chats);
    });

    socket.on(WEBSOCKET_EVENTS.CONNECTION_ERROR, () => console.log('connection_error'));

    socket.on(WEBSOCKET_EVENTS.CREATED_CHAT_SUCCESSFULLY, ({ chat, isCreated }) => {
      if (isCreated) {
        addChat(chat);
      }
    });

    socket.on(WEBSOCKET_EVENTS.USER_CONNECTED, (userId) => {
      addOnlineStatus(userId, true);
    });

    socket.on(WEBSOCKET_EVENTS.DISCONNECT, (reason) =>
      console.log(`Disconnected by reason: ${reason}`),
    );

    return () => {
      setIsChatOpened(false);
      clearChatsData();
      resetSocket();
      socket.removeAllListeners();
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on(WEBSOCKET_EVENTS.RECEIVE_MESSAGE, (message) => {
        addMessage(message);
        if (message.chatId !== currentChatId) toastMessage(message, userId);
      });

      return () => {
        socket.removeListener(WEBSOCKET_EVENTS.RECEIVE_MESSAGE);
      };
    }
  }, [socket, currentChatId]);

  useEffect(() => {
    if (socket && receiverId) {
      socket.on(WEBSOCKET_EVENTS.RECEIVER_START_TYPING, (userId) => {
        if (receiverId === userId) setIsReceiverTyping(true);
      });

      socket.on(WEBSOCKET_EVENTS.RECEIVER_STOP_TYPING, (userId) => {
        if (receiverId === userId) setIsReceiverTyping(false);
      });

      return () => {
        socket.removeListener(WEBSOCKET_EVENTS.RECEIVER_START_TYPING);
        socket.removeListener(WEBSOCKET_EVENTS.RECEIVER_STOP_TYPING);
      };
    }
  }, [socket, receiverId]);

  useEffect(() => {
    if (socket) {
      socket.on(WEBSOCKET_EVENTS.USER_DISCONNECTED, (userId) => {
        addOnlineStatus(userId, false);
        if (receiverId === userId) setIsReceiverTyping(false); // in case the receiver leaves the page
      });

      return () => {
        socket.removeListener(WEBSOCKET_EVENTS.USER_DISCONNECTED);
      };
    }
  }, [socket, receiverId]);
};

export default useSocketSetup;
