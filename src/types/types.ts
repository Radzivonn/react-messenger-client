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

export interface UserWithOnlineStatus extends User {
  online: boolean;
}

export enum WEBSOCKET_EVENTS {
  SEND_MESSAGE = 'send_message',
  RECEIVE_MESSAGE = 'receive_message',
  CONNECTION = 'connect',
  CONNECTION_ERROR = 'connect_error',
  DISCONNECT = 'disconnect', // * Fired upon disconnection.
  DISCONNECTING = 'disconnecting', // * Fired when the client is going to be disconnected (but hasn't left its rooms yet).
  JOIN_ROOM = 'join_room',
  JOINED_ROOM_SUCCESSFULLY = 'joined_room_successfully',
  LEFT_ROOM_SUCCESSFULLY = 'left_room_successfully',
  LEAVE_ROOM = 'leave_room',
  CONNECT_PARTICIPANT = 'connect_participant',
  DISCONNECT_PARTICIPANT = 'disconnect_participant',
}

interface JoinedRoomSuccessfullyPayload {
  chat: IChat;
  isCreated: boolean;
}

export interface ServerToClientEvents {
  receive_message: (message: Message) => void;
  joined_room_successfully: (payload: JoinedRoomSuccessfullyPayload) => void;
  left_room_successfully: () => void;
  connect_participant: (isReceiverOnline: boolean) => void;
  disconnect_participant: () => void;
}

export interface JoinRoomPayload {
  chatId: string;
  userId: string;
  receiverId: string;
}

export interface ClientToServerEvents {
  join_room: (payload: JoinRoomPayload) => void;
  send_message: (message: Message) => void;
  leave_room: (chatId: string) => void;
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

export interface MainPageComponentOutletContextType {
  userId: string;
  userName: string;
}
