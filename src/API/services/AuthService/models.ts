import { User } from '../../../types/types';

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
