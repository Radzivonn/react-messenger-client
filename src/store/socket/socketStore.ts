import { create } from 'zustand';
import { Socket } from 'socket.io-client';
import { devtools } from 'zustand/middleware';

interface SocketStore {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
  resetSocket: () => void;
}

export const useSocketStore = create<SocketStore>()(
  devtools((set) => ({
    socket: null,
    setSocket: (socket: Socket) => set(() => ({ socket })),
    resetSocket: () => set(() => ({ socket: null })),
  })),
);
