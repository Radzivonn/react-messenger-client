import api from '../../http';
import { IChat } from '../../../types/types';
import endpoints from './endpoints';

class ChatService {
  private readonly BASE_URL = 'chat';

  public getUserChats(userId: string, userName: string) {
    const chats: Promise<IChat[]> = api
      .get(`${this.BASE_URL}/${endpoints.getChatList}/${userId}/${userName}`)
      .json();
    return chats;
  }
}

const chatService = new ChatService();
export default chatService;
