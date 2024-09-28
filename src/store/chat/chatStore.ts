import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IChat, Message } from 'types/types';

/*
  Chats are stored in an object with chat id as keys and with chat objects as values
  ​​for quick access to a specific chat by key and its subsequent change 
  (for example, addMessage function)
  because when stored in an array, 
  you would have to do a linear search of the chat each time throughout array 
*/

interface ChatStore {
  chats: Record<string, IChat>;
  setChats: (chats: IChat[]) => void;
  addChat: (chat: IChat) => void;
  clearChatsData: () => void;
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatStore>()(
  devtools((set) => ({
    chats: {},
    setChats: (chats: IChat[]) =>
      set(() => {
        const chatsRecord: Record<string, IChat> = {};

        chats.forEach((chat) => {
          chatsRecord[chat.chatId] = chat;
        });

        return {
          chats: chatsRecord,
        };
      }),
    addChat: (chat) =>
      set((state) => ({
        chats: {
          ...state.chats,
          [chat.chatId]: chat,
        },
      })),
    clearChatsData: () => set(() => ({ chats: {} })),
    addMessage: (message) =>
      set((state) => {
        const chat = state.chats[message.chatId];

        if (chat) {
          chat.messages.push(message);
          return {
            chats: {
              ...state.chats,
              [chat.chatId]: chat,
            },
          };
        }

        return { chats: state.chats };
      }),
  })),
);
