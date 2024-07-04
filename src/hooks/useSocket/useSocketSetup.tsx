import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { WEBSOCKET_EVENTS } from '../../types/types';
import { ServerToClientEvents, ClientToServerEvents } from '../../types/types';
import { useQueryClient } from '@tanstack/react-query';
import { useSocketStore } from '../../store/socket/socketStore';
import { useChatStore } from '../../store/chatData/chatData';
import { useChangeOnlineStatus } from '../useUserData/useChangeOnlineStatus';

const useSocketSetup = (userId: string) => {
  const queryClient = useQueryClient();
  const { mutate: changeOnlineStatus } = useChangeOnlineStatus(userId);

  const setSocket = useSocketStore((state) => state.setSocket);
  const resetSocket = useSocketStore((state) => state.resetSocket);
  const { setCurrentChat, addMessage, clearChatData } = useChatStore();

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:5050/');

    socket.on(WEBSOCKET_EVENTS.CONNECTION, () => {
      setSocket(socket);
      changeOnlineStatus(true);
    });

    socket.on(WEBSOCKET_EVENTS.CONNECTION_ERROR, () => console.log('connection_error'));

    socket.on(WEBSOCKET_EVENTS.JOINED_ROOM_SUCCESSFULLY, ({ chat, isCreated }) => {
      setCurrentChat(chat);
      if (isCreated) {
        void queryClient.invalidateQueries({ queryKey: ['chatList', userId] });
      }
      void queryClient.invalidateQueries({ queryKey: ['friendList', userId] });
    });

    socket.on(WEBSOCKET_EVENTS.LEFT_ROOM_SUCCESSFULLY, () => clearChatData());

    socket.on(WEBSOCKET_EVENTS.RECEIVE_MESSAGE, (message) => {
      addMessage(message);
      void queryClient.invalidateQueries({ queryKey: ['chatList', userId] });
    });

    socket.on(WEBSOCKET_EVENTS.DISCONNECT, (reason) => {
      changeOnlineStatus(false); // ???
      console.log(`Disconnected by reason: ${reason}`);
    });

    return () => {
      changeOnlineStatus(false);
      resetSocket();
      socket.removeAllListeners();
      socket.close();
    };
  }, []);
};

export default useSocketSetup;
