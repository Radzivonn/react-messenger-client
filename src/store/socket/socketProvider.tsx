import React, { type FC, useState } from 'react';
import { Socket } from 'socket.io-client';
import { SocketContext } from './socketContext';

export const SocketProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();

  return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};
