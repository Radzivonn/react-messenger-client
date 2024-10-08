export enum STATUS_CODES {
  UNAUTHORIZED = 403,
  UNAUTHENTICATED = 401,
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface IAvatar {
  userId: string;
  avatarPath: string;
}

export interface Message {
  chatId: string;
  date: string;
  name: string;
  message: string;
}

interface Participant {
  userId: string;
  userName: string;
}

export interface IChat {
  chatId: string;
  participants: Participant[];
  messages: Message[];
}

export interface UserWithOnlineStatus extends User {
  online: boolean;
}

export enum WEBSOCKET_EVENTS {
  SOCKET_SUCCESSFULLY_CONNECTED = 'socket_successfully_connected',
  SOCKET_SUCCESSFULLY_DISCONNECTED = 'socket_successfully_disconnected',
  SEND_MESSAGE = 'send_message',
  RECEIVE_MESSAGE = 'receive_message',
  START_TYPING = 'start_typing',
  STOP_TYPING = 'stop_typing',
  RECEIVER_START_TYPING = 'receiver_start_typing',
  RECEIVER_STOP_TYPING = 'receiver_stop_typing',
  CONNECTION = 'connect',
  CONNECTION_ERROR = 'connect_error',
  DISCONNECT = 'disconnect', // * Fired upon disconnection.
  DISCONNECTING = 'disconnecting', // * Fired when the client is going to be disconnected (but hasn't left its rooms yet).
  CREATE_CHAT = 'create_chat',
  CREATED_CHAT_SUCCESSFULLY = 'created_chat_successfully',
  LEFT_ROOM_SUCCESSFULLY = 'left_room_successfully',
  LEAVE_ROOM = 'leave_room',
  CONNECT_USER = 'connect_user',
  USER_CONNECTED = 'user_connected',
  DISCONNECT_USER = 'disconnect_user',
  USER_DISCONNECTED = 'user_disconnected',
}

interface CreatedChatSuccessfullyPayload {
  chat: IChat;
  isCreated: boolean;
}

export interface ServerToClientEvents {
  socket_successfully_connected: (
    friendsOnlineStatuses: Record<string, boolean>,
    chats: IChat[],
  ) => void;
  socket_successfully_disconnected: () => void;
  receive_message: (message: Message) => void;
  receiver_start_typing: (userId: string) => void;
  receiver_stop_typing: (userId: string) => void;
  created_chat_successfully: (payload: CreatedChatSuccessfullyPayload) => void;
  left_room_successfully: () => void;
  user_connected: (userId: string) => void;
  user_disconnected: (userId: string) => void;
}

export interface CreateChatPayload {
  chatId: string;
  userId: string;
  receiverId: string;
}

export interface ClientToServerEvents {
  start_typing: (chatId: string, userId: string) => void;
  stop_typing: (chatId: string, userId: string) => void;
  create_chat: (payload: CreateChatPayload) => void;
  send_message: (message: Message) => void;
  leave_room: () => void;
  connect_user: (userId: string, userName: string) => void;
  disconnect_user: (userId: string) => void;
}

export interface MainPageComponentOutletContext {
  userId: string;
  userName: string;
}
