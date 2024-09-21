import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { WEBSOCKET_EVENTS } from 'types/types';
import { ServerToClientEvents, ClientToServerEvents } from 'types/types';
import { useQueryClient } from '@tanstack/react-query';
import { useSocketStore } from 'store/socket/socketStore';
import { useChatStore } from 'store/chat/chatStore';
import { useFriendsOnlineStatusesStore } from 'store/onlineStatuses/onlineStatusesStore';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import { useReceiverStore } from 'store/receiver/receiverStore';
import { useSearchParams } from 'react-router-dom';

const useSocketSetup = (userId: string, userName: string, chatId: string | null) => {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get('receiverId');

  const { socket, setSocket } = useSocketStore();
  const resetSocket = useSocketStore((state) => state.resetSocket);
  const { setCurrentChat, addMessage, clearChatData } = useChatStore();
  const { addOnlineStatus, setOnlineStatuses } = useFriendsOnlineStatusesStore();
  const setIsChatOpened = useAppSettingsStore((state) => state.setIsChatOpened);
  const setIsReceiverTyping = useReceiverStore((state) => state.setIsReceiverTyping);

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:5050/');

    socket.on(WEBSOCKET_EVENTS.CONNECTION, () => {
      socket.emit(WEBSOCKET_EVENTS.CONNECT_PARTICIPANT, userId, userName);
      setSocket(socket);
    });

    socket.on(WEBSOCKET_EVENTS.SOCKET_SUCCESSFULLY_CONNECTED, (friendsOnlineStatuses) =>
      setOnlineStatuses(friendsOnlineStatuses),
    );

    socket.on(WEBSOCKET_EVENTS.CONNECTION_ERROR, () => console.log('connection_error'));

    socket.on(WEBSOCKET_EVENTS.JOINED_ROOM_SUCCESSFULLY, ({ chat, isCreated }) => {
      if (isCreated) {
        void queryClient.invalidateQueries({ queryKey: ['chatList', userId] }); //!!! optimize because fetch all chats bad idea
      }
      setCurrentChat(chat);
    });

    socket.on(WEBSOCKET_EVENTS.PARTICIPANT_CONNECTED, (userId) => {
      addOnlineStatus(userId, true);
    });

    socket.on(WEBSOCKET_EVENTS.DISCONNECT, (reason) =>
      console.log(`Disconnected by reason: ${reason}`),
    );

    return () => {
      setIsChatOpened(false);
      clearChatData();
      resetSocket();
      socket.removeAllListeners();
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on(WEBSOCKET_EVENTS.RECEIVE_MESSAGE, (message) => {
        void queryClient.invalidateQueries({ queryKey: ['chatList', userId] }); // !!! optimize because fetch all chats bad idea
        if (message.chatId === chatId) {
          addMessage(message);
        }
      });

      return () => {
        socket.removeListener(WEBSOCKET_EVENTS.RECEIVE_MESSAGE);
      };
    }
  }, [chatId, socket]);

  useEffect(() => {
    if (socket) {
      socket.on(WEBSOCKET_EVENTS.RECEIVER_START_TYPING, (userId) => {
        if (receiverId === userId) setIsReceiverTyping(true);
      });

      socket.on(WEBSOCKET_EVENTS.RECEIVER_STOP_TYPING, (userId) => {
        if (receiverId === userId) setIsReceiverTyping(false);
      });

      socket.on(WEBSOCKET_EVENTS.PARTICIPANT_DISCONNECTED, (userId) => {
        addOnlineStatus(userId, false);
        if (receiverId === userId) setIsReceiverTyping(false); // in case the receiver leaves the page
      });

      return () => {
        socket.removeListener(WEBSOCKET_EVENTS.RECEIVER_START_TYPING);
        socket.removeListener(WEBSOCKET_EVENTS.RECEIVER_STOP_TYPING);
        socket.removeListener(WEBSOCKET_EVENTS.PARTICIPANT_DISCONNECTED);
      };
    }
  }, [receiverId, socket]);
};

export default useSocketSetup;
