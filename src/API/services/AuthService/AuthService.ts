import { KyResponse } from 'ky';
import api from '../../http';
import endpoints from './endpoints';
import { AuthResponse } from './models';

export default class AuthService {
  public static getAuthHeader() {
    return `Bearer ${localStorage.getItem('accessToken')}`;
  }

  public static saveAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  public static removeAccessToken() {
    localStorage.removeItem('accessToken');
  }

  public static hasAccessToken() {
    return localStorage.getItem('accessToken') ? true : false;
  }

  public static register(name: string, email: string, password: string) {
    try {
      const reqBody = { name, email, password };
      const user: Promise<AuthResponse> = api
        .post(`user/${endpoints.registration}`, { json: reqBody })
        .json();
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  public static login(email: string, password: string) {
    try {
      const reqBody = { email, password };
      const user: Promise<AuthResponse> = api
        .post(`user/${endpoints.login}`, { json: reqBody })
        .json();
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  public static logout(userId: string) {
    const response: Promise<KyResponse> = api.post(`user/${endpoints.logout}/${userId}`);
    return response;
  }

  public static refreshTokens() {
    try {
      const user: Promise<AuthResponse> = api.get(`user/${endpoints.refresh}`).json();
      return user;
    } catch (e) {
      console.error(e);
    }
  }
}
