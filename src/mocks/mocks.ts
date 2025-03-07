import { IChat, Message, User } from 'types/types';

export const mockUser: User = {
  id: 'mock-id',
  name: 'mock-name',
  email: 'mock-email',
  role: 'mock-role',
};

export const mockErrorUser: User = {
  id: 'mock-error-id',
  name: 'mock-name',
  email: 'mock-email',
  role: 'mock-role',
};

export const mockSearchData: User[] = [
  {
    id: '1',
    name: 'John',
    email: 'John@gmail.com',
    role: 'user',
  },
];

export const mockFriendListData: User[] = [
  {
    id: '1',
    name: 'John',
    email: 'John@gmail.com',
    role: 'user',
  },
  {
    id: '2',
    name: 'Lisa',
    email: 'Lisa@gmail.com',
    role: 'user',
  },
];

export const mockMessages: Message[] = [
  {
    chatId: 'chat1',
    date: new Date('September 28, 2024 23:59:00').toString(),
    name: 'mock-name',
    message: 'Hello!',
  },
  {
    chatId: 'chat1',
    date: new Date('September 28, 2024 12:00:00').toString(),
    name: 'mock-receiver-name',
    message: 'Hi!',
  },
];

export const mockChatListData: Record<string, IChat> = {
  'mock-chat-list': {
    chatId: 'chat1',
    participants: [
      { userId: 'mock-id', userName: 'mock-name' },
      { userId: 'mock-receiver-id', userName: 'mock-receiver-name' },
    ],
    messages: mockMessages,
  },
};

export const mockIncorrectChatListData: Record<string, IChat> = {
  'mock-incorrect-chat-list': {
    chatId: 'chat1',
    participants: [{ userId: 'mock-id', userName: 'mock-name' }], // incorrect because one participant
    messages: mockMessages,
  },
};
