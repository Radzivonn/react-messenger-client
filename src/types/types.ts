export enum STATUS_CODES {
  UNAUTHORIZED = 403,
  UNAUTHENTICATED = 401,
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
