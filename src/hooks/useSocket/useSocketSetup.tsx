import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { Message, WEBSOCKET_EVENTS } from '../../types/types';
import { ClientToServerEvents, ServerToClientEvents } from './types';
import { useQueryClient } from '@tanstack/react-query';
import { useSocketStore } from '../../store/socket/socketStore';
import { useReceiverStore } from '../../store/receiver/receiverStore';

const useSocketSetup = (
  userId: string,
  receiverId: string,
  chatId: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
) => {
  const queryClient = useQueryClient();
  const setSocket = useSocketStore((state) => state.setSocket);
  const resetSocket = useSocketStore((state) => state.resetSocket);
  const setReceiverStatus = useReceiverStore((state) => state.setReceiverStatus);

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:5050/');

    socket.on(WEBSOCKET_EVENTS.CONNECTION_ERROR, () => {
      console.log('connection_error');
    });

    socket.on(WEBSOCKET_EVENTS.JOINED_ROOM_SUCCESSFULLY, ({ messages, isCreated }) => {
      setSocket(socket);
      setMessages([...messages]);
      if (isCreated) {
        void queryClient.invalidateQueries({ queryKey: ['chatList', userId] });
      }
    });

    socket.on(WEBSOCKET_EVENTS.RECEIVE_MESSAGE, (message) => {
      setMessages((prev) => [...prev, message]);
      void queryClient.invalidateQueries({ queryKey: ['chatList', userId] });
    });

    socket.on(WEBSOCKET_EVENTS.CONNECT_PARTICIPANT, (isReceiverOnline) => {
      setReceiverStatus(isReceiverOnline);
    });

    socket.on(WEBSOCKET_EVENTS.DISCONNECT_PARTICIPANT, () => {
      setReceiverStatus(false);
    });

    socket.on(WEBSOCKET_EVENTS.DISCONNECT, (reason) => {
      console.log(`Disconnected by reason: ${reason}`);
    });

    socket.emit(WEBSOCKET_EVENTS.JOIN_ROOM, { chatId, userId, receiverId });

    return () => {
      socket.emit(WEBSOCKET_EVENTS.LEAVE_ROOM, chatId);
      resetSocket();
      socket.removeAllListeners();
      socket.close();
    };
  }, [chatId]);
};

export default useSocketSetup;
