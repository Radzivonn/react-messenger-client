import { useContext, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { Message, WEBSOCKET_EVENTS } from '../../types/types';
import { ClientToServerEvents, ServerToClientEvents } from './types';
import { SocketContext } from '../../store/socket/socketContext';
import { ReceiverContext } from '../../store/receiverData/receiverContext';
import { useQueryClient } from '@tanstack/react-query';

const useSocketSetup = (
  userId: string,
  receiverId: string,
  chatId: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
) => {
  const queryClient = useQueryClient();
  const { setSocket } = useContext(SocketContext);
  const { setIsReceiverOnline } = useContext(ReceiverContext);

  if (!setSocket || !setIsReceiverOnline) return; // !!! сделать проверку на подлинность всех id прежде чем делать запросы

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:5000/');

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
      setIsReceiverOnline(isReceiverOnline);
    });

    socket.on(WEBSOCKET_EVENTS.DISCONNECT_PARTICIPANT, () => {
      setIsReceiverOnline(false);
    });

    socket.on(WEBSOCKET_EVENTS.DISCONNECT, (reason) => {
      console.log(`Disconnected by reason: ${reason}`);
    });

    socket.emit(WEBSOCKET_EVENTS.JOIN_ROOM, { chatId, userId, receiverId });

    return () => {
      socket.emit(WEBSOCKET_EVENTS.LEAVE_ROOM, chatId);
      setSocket(undefined);
      socket.removeAllListeners();
      socket.close();
    };
  }, [chatId]);
};

export default useSocketSetup;
