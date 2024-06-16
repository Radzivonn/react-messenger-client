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

export enum WEBSOCKET_EVENTS {
  SEND_MESSAGE = 'send_message',
  RECEIVE_MESSAGE = 'receive_message',
  CONNECTION = 'connection',
  CONNECTION_ERROR = 'connect_error',
  DISCONNECT = 'disconnect', // * Fired upon disconnection.
  DISCONNECTING = 'disconnecting', // * Fired when the client is going to be disconnected (but hasn't left its rooms yet).
  JOIN_ROOM = 'join_room',
  JOINED_ROOM_SUCCESSFULLY = 'joined_room_successfully',
  LEAVE_ROOM = 'leave_room',
  CONNECT_PARTICIPANT = 'connect_participant',
  DISCONNECT_PARTICIPANT = 'disconnect_participant',
}

export interface Message {
  chatId: string;
  date: string;
  name: string;
  message: string;
}

export interface Chat {
  chatId: string;
  participantsIds: string[];
  participantsNames: string[];
  messages: Message[];
}

export interface MainPageComponentOutletContextType {
  userId: string;
}
