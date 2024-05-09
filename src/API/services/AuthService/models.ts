import { IUser } from '../../../types/types';

export interface AuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
