import { Message } from '../../types/types';

interface JoinedRoomSuccessfullyPayload {
  messages: Message[];
  isCreated: boolean;
}

export interface ServerToClientEvents {
  receive_message: (message: Message) => void;
  joined_room_successfully: (payload: JoinedRoomSuccessfullyPayload) => void;
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
