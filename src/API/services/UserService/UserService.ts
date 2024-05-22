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

  public static getFriends(userId: string) {
    const friends: Promise<User[]> = api.get(`user/${endpoints.getFriends}/${userId}`).json();
    return friends;
  }
}
