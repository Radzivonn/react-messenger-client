import { UserWithOnlineStatus } from '../../../types/types';
import api from '../../http';
import endpoints from './endpoints';

class FriendListService {
  private readonly BASE_URL = 'friends';

  public addFriend(userId: string, friendId: string) {
    const reqBody = { userId, friendId };
    return api.post(`${this.BASE_URL}/${endpoints.addFriend}`, { json: reqBody });
  }

  public removeFriend(userId: string, friendId: string) {
    const reqBody = { userId, friendId };
    return api.delete(`${this.BASE_URL}/${endpoints.removeFriend}`, { json: reqBody });
  }

  public getFriends(userId: string) {
    const friends: Promise<UserWithOnlineStatus[]> = api
      .get(`${this.BASE_URL}/${endpoints.getFriends}/${userId}`)
      .json();
    return friends;
  }

  public searchUsers(userId: string, search: string) {
    const users: Promise<UserWithOnlineStatus[]> = api
      .get(`${this.BASE_URL}/${userId}/${endpoints.searching}/${search}`)
      .json();
    return users;
  }
}

const friendListService = new FriendListService();
export default friendListService;
