import { create } from 'zustand';
import { Socket } from 'socket.io-client';
import { devtools } from 'zustand/middleware';
import { ServerToClientEvents, ClientToServerEvents } from '../../types/types';

interface SocketStore {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  setSocket: (socket: Socket<ServerToClientEvents, ClientToServerEvents>) => void;
  resetSocket: () => void;
}

export const useSocketStore = create<SocketStore>()(
  devtools((set) => ({
    socket: null,
    setSocket: (socket) => set(() => ({ socket })),
    resetSocket: () => set(() => ({ socket: null })),
  })),
);
