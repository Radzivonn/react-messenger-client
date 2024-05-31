import { User } from '../../../types/types';
import api from '../../http';
import AuthService from '../AuthService/AuthService';
import endpoints from './endpoints';

export default class UserService {
  /** Get user data by access jwt from local storage */
  public static getUserData() {
    try {
      if (!AuthService.hasAccessToken()) return null;
      const user: Promise<User> = api.get(`user/${endpoints.getUserData}`).json();
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  public static addFriend(userId: string, friendId: string) {
    const reqBody = { userId, friendId };
    const friendsIds: Promise<string[]> = api
      .post(`user/${endpoints.addFriend}`, { json: reqBody })
      .json();
    return friendsIds;
  }

  public static removeFriend(userId: string, friendId: string) {
    const reqBody = { userId, friendId };
    const friendsIds: Promise<string[]> = api
      .delete(`user/${endpoints.removeFriend}`, { json: reqBody })
      .json();
    return friendsIds;
  }

  public static getFriends(userId: string) {
    const friends: Promise<User[]> = api.get(`user/${endpoints.getFriends}/${userId}`).json();
    return friends;
  }

  public static searchUsers(userId: string, search: string) {
    const users: Promise<User[]> = api
      .get(`user/${userId}/${endpoints.searching}/${search}`)
      .json();
    return users;
  }
}
