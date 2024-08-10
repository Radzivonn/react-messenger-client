import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppSettingsStore {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  isChatOpened: boolean;
  setIsChatOpened: (isChatOpened: boolean) => void;
  isSettingsOpened: boolean;
  setIsSettingsOpened: (isSettingsOpened: boolean) => void;
}

export const useAppSettingsStore = create<AppSettingsStore>()(
  devtools((set) => ({
    isMobile: false,
    setIsMobile: (isMobile) => set(() => ({ isMobile })),
    isChatOpened: false,
    setIsChatOpened: (isChatOpened) => set(() => ({ isChatOpened })),
    isSettingsOpened: false,
    setIsSettingsOpened: (isSettingsOpened) => set(() => ({ isSettingsOpened })),
  })),
);
