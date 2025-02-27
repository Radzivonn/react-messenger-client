import { http, HttpResponse } from 'msw';
import { mockUser } from 'mocks/mocks';

/* ! use npm run test only in development when URL is "http://localhost:port" */
const VITE_SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

export const handlers = [
  http.get(`${VITE_SERVER_API_URL}/auth/refresh`, () => {
    return HttpResponse.json(null, { status: 401 });
  }),

  http.post(`${VITE_SERVER_API_URL}/auth/logout/:userId`, (req) => {
    const { userId } = req.params;
    if (userId === 'mock-id') return HttpResponse.json(204);
    return HttpResponse.json(null, { status: 500 });
  }),

  http.delete(`${VITE_SERVER_API_URL}/user/:userId/removeAccount`, (req) => {
    const { userId } = req.params;
    if (userId === 'mock-id') return HttpResponse.json(204);
    return HttpResponse.json(null, { status: 500 });
  }),

  http.get(`${VITE_SERVER_API_URL}/user/getData`, () => {
    return HttpResponse.json(mockUser);
  }),

  http.get(`${VITE_SERVER_API_URL}/user/noData-id/getAvatarImage`, () => {
    return HttpResponse.json(undefined);
  }),

  http.get(`${VITE_SERVER_API_URL}/user/mock-id/getAvatarImage`, () => {
    return HttpResponse.json({
      avatarPath: 'path',
    });
  }),

  http.post(`${VITE_SERVER_API_URL}/friends/addFriend`, () => {
    return HttpResponse.json({}, { status: 204 });
  }),

  http.delete(`${VITE_SERVER_API_URL}/friends/removeFriend`, () => {
    return HttpResponse.json({}, { status: 204 });
  }),
];
