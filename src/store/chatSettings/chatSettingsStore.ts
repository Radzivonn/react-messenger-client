import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ChatSettingsStore {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  isChatOpened: boolean;
  setIsChatOpened: (isChatOpened: boolean) => void;
}

export const useChatSettingsStore = create<ChatSettingsStore>()(
  devtools((set) => ({
    isMobile: false,
    setIsMobile: (isMobile) => set(() => ({ isMobile })),
    isChatOpened: false,
    setIsChatOpened: (isChatOpened: boolean) => set(() => ({ isChatOpened })),
  })),
);
