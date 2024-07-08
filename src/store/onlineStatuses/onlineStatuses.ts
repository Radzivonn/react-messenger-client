import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface OnlineStatusesStore {
  onlineStatuses: Record<string, boolean>;
  setOnlineStatuses: (onlineStatuses: Record<string, boolean>) => void;
  addOnlineStatus: (friendId: string, onlineStatus: boolean) => void;
}

export const useFriendsOnlineStatusesStore = create<OnlineStatusesStore>()(
  devtools((set) => ({
    onlineStatuses: {},
    setOnlineStatuses: (onlineStatuses) => set(() => ({ onlineStatuses: onlineStatuses })),
    addOnlineStatus: (friendId, onlineStatus) =>
      set(({ onlineStatuses }) => {
        return {
          onlineStatuses: {
            ...onlineStatuses,
            [friendId]: onlineStatus,
          },
        };
      }),
  })),
);
