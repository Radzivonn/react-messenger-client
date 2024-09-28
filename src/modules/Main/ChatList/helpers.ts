import { IChat } from 'types/types';

const convertToChatsArray = (chats: Record<string, IChat>) => {
  const chatList = [];

  for (const chatId in chats) {
    if (chats[chatId].messages.length !== 0) chatList.push(chats[chatId]);
  }

  return chatList;
};

/**
 * Function to convert a chats object into an array of chats and sort by time of last message
 * @param chats object with key = chat id, value = chat object
 * @returns array of chat objects
 */
export const getSortedChatList = (chats: Record<string, IChat>) => {
  const chatList = convertToChatsArray(chats);

  if (chatList.length === 0) return [];

  chatList.sort((a, b) => {
    const lastMessageA = a.messages[a.messages.length - 1];
    const lastMessageB = b.messages[b.messages.length - 1];
    return Date.parse(lastMessageA.date) > Date.parse(lastMessageB.date) ? -1 : 1;
  });

  return chatList;
};
