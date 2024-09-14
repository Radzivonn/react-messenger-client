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
    date: '12:00',
    name: 'mock-name',
    message: 'Hello!',
  },
  {
    chatId: 'chat1',
    date: '12:01',
    name: 'mock-receiver-name',
    message: 'Hi!',
  },
];

export const mockChatListData: IChat[] = [
  {
    chatId: 'chat1',
    participants: [
      { userId: 'mock-id', userName: 'mock-name' },
      { userId: 'mock-receiver-id', userName: 'mock-receiver-name' },
    ],
    messages: mockMessages,
  },
];

export const mockIncorrectChatListData: IChat[] = [
  {
    chatId: 'chat1',
    participants: [{ userId: 'mock-id', userName: 'mock-name' }], // incorrect because one participant
    messages: mockMessages,
  },
];
