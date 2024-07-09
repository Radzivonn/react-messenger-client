import { User } from '../../../types/types';
import api from '../../http';
import authService from '../AuthService/AuthService';
import endpoints from './endpoints';

class UserService {
  private readonly BASE_URL = 'user';

  /** Get user data by access jwt from local storage */
  public getUserData() {
    try {
      if (!authService.hasAccessToken()) return null;
      const user: Promise<User> = api.get(`${this.BASE_URL}/${endpoints.getUserData}`).json();
      return user;
    } catch (e) {
      console.error(e);
    }
  }
}

const userService = new UserService();
export default userService;
