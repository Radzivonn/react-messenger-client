import { AuthResponse } from 'API/services/AuthService/models';

export const mockResponse: AuthResponse = {
  user: {
    id: 'mock-id',
    name: 'mock-name',
    email: 'mock-email',
    role: 'mock-role',
  },
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
};
