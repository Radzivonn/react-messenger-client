import { IChat } from 'types/types';
import api from 'API/http';
import endpoints from './endpoints';

class ChatService {
  private readonly BASE_URL = 'chat';

  public getUserChats(userId: string, userName: string) {
    const chats: Promise<IChat[]> = api
      .get(`${this.BASE_URL}/${endpoints.getChatList}/${userId}/${userName}`)
      .json();
    return chats;
  }

  public getEmojiMartData() {
    return api.get('https://cdn.jsdelivr.net/npm/@emoji-mart/data').json();
  }
}

const chatService = new ChatService();
export default chatService;
