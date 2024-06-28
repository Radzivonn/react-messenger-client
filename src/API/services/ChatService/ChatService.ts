import api from '../../http';
import { Chat } from '../../../types/types';
import endpoints from './endpoints';

class ChatService {
  private readonly BASE_URL = 'chat';

  public getUserChats(userId: string) {
    const chat: Promise<Chat[]> = api
      .get(`${this.BASE_URL}/${endpoints.getChatList}/${userId}`)
      .json();
    return chat;
  }
}

const chatService = new ChatService();
export default chatService;
