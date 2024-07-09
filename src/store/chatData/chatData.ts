import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IChat, Message } from '../../types/types';

interface ChatStore {
  currentChat: IChat | null;
  setCurrentChat: (chat: IChat) => void;
  clearChatData: () => void;
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatStore>()(
  devtools((set) => ({
    currentChat: null,
    setCurrentChat: (chat) => set(() => ({ currentChat: chat })),
    clearChatData: () => set(() => ({ currentChat: null })),
    addMessage: (message) =>
      set((state) => {
        if (state.currentChat) {
          return {
            currentChat: {
              ...state.currentChat,
              messages: [...state.currentChat.messages, message],
            },
          };
        }
        return { currentChat: null };
      }),
  })),
);
