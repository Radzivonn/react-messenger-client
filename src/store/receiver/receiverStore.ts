import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ReceiverStore {
  isReceiverTyping: boolean;
  setIsReceiverTyping: (isOnline: boolean) => void;
}

export const useReceiverStore = create<ReceiverStore>()(
  devtools((set) => ({
    isReceiverTyping: false,
    setIsReceiverTyping: (isTyping) => set(() => ({ isReceiverTyping: isTyping })),
  })),
);
