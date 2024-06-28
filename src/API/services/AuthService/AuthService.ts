import { KyResponse } from 'ky';
import api from '../../http';
import endpoints from './endpoints';
import { AuthResponse } from './models';

class AuthService {
  private readonly BASE_URL = 'auth';

  public getAuthHeader() {
    return `Bearer ${localStorage.getItem('accessToken')}`;
  }

  public saveAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  public removeAccessToken() {
    localStorage.removeItem('accessToken');
  }

  public hasAccessToken() {
    return localStorage.getItem('accessToken') ? true : false;
  }

  public register(name: string, email: string, password: string) {
    try {
      const reqBody = { name, email, password };
      const user: Promise<AuthResponse> = api
        .post(`${this.BASE_URL}/${endpoints.registration}`, { json: reqBody })
        .json();
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  public login(email: string, password: string) {
    try {
      const reqBody = { email, password };
      const user: Promise<AuthResponse> = api
        .post(`${this.BASE_URL}/${endpoints.login}`, { json: reqBody })
        .json();
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  public logout(userId: string) {
    const response: Promise<KyResponse> = api.post(
      `${this.BASE_URL}/${endpoints.logout}/${userId}`,
    );
    return response;
  }

  public refreshTokens() {
    try {
      const user: Promise<AuthResponse> = api.get(`${this.BASE_URL}/${endpoints.refresh}`).json();
      return user;
    } catch (e) {
      console.error(e);
    }
  }
}

const authService = new AuthService();
export default authService;
