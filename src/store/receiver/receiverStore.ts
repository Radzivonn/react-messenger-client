import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ReceiverStore {
  isReceiverOnline: boolean;
  setReceiverStatus: (isOnline: boolean) => void;
}

export const useReceiverStore = create<ReceiverStore>()(
  devtools((set) => ({
    isReceiverOnline: false,
    setReceiverStatus: (isOnline) => set(() => ({ isReceiverOnline: isOnline })),
  })),
);
