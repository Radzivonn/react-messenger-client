import { KyResponse } from 'ky';
import api from 'API/http';
import endpoints from './endpoints';
import { User } from 'types/types';

class AuthService {
  private readonly BASE_URL = 'auth';

  public register(name: string, email: string, password: string) {
    const reqBody = { name, email, password };
    const user: Promise<User> = api
      .post(`${this.BASE_URL}/${endpoints.registration}`, { json: reqBody })
      .json();
    return user;
  }

  public login(email: string, password: string) {
    const reqBody = { email, password };
    const user: Promise<User> = api
      .post(`${this.BASE_URL}/${endpoints.login}`, { json: reqBody })
      .json();
    return user;
  }

  public logout(userId: string) {
    const response: Promise<KyResponse> = api.post(
      `${this.BASE_URL}/${endpoints.logout}/${userId}`,
    );
    return response;
  }

  public refreshTokens() {
    try {
      const user: Promise<User> = api.get(`${this.BASE_URL}/${endpoints.refresh}`).json();
      return user;
    } catch (e) {
      console.error(e);
    }
  }
}

const authService = new AuthService();
export default authService;
