import React, { createContext } from 'react';
import { Socket } from 'socket.io-client';

export const SocketContext = createContext<{
  socket?: Socket;
  setSocket?: React.Dispatch<React.SetStateAction<Socket | undefined>>;
}>({});
