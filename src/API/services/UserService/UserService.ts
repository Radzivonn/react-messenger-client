import { KyResponse } from 'ky';
import { User } from 'types/types';
import api from 'API/http';
import authService from '../AuthService/AuthService';
import endpoints from './endpoints';
import { AuthResponse } from '../AuthService/models';

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

  public getAvatarImage(userId: string) {
    try {
      const avatar: Promise<{ avatarPath: string }> = api
        .get(`${this.BASE_URL}/${userId}/${endpoints.getAvatarImage}`)
        .json();

      return avatar;
    } catch (e) {
      console.error(e);
    }
  }

  public updateAvatarImage(userId: string, image: File) {
    try {
      const data = new FormData();
      data.append('avatar', image);

      const response: Promise<KyResponse> = api
        .post(`${this.BASE_URL}/${userId}/${endpoints.updateAvatarImage}`, {
          body: data,
        })
        .json();
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  public updateUserName(userId: string, newName: string) {
    try {
      const reqBody = { id: userId, name: newName };
      const user: Promise<AuthResponse> = api
        .put(`${this.BASE_URL}/${endpoints.updateUserName}`, { json: reqBody })
        .json();
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  removeAccount(userId: string) {
    try {
      return api.delete(`${this.BASE_URL}/${userId}/${endpoints.removeAccount}`);
    } catch (e) {
      console.error(e);
    }
  }
}

const userService = new UserService();
export default userService;
