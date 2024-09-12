import { http, HttpResponse } from 'msw';
import { mockUser } from 'mocks/mocks';

export const handlers = [
  http.post('http://localhost:5050/auth/logout/:userId', (req) => {
    const { userId } = req.params;
    if (userId === 'mock-id') return HttpResponse.json(204);
    return HttpResponse.json(null, { status: 500 });
  }),

  http.delete('http://localhost:5050/user/:userId/removeAccount', (req) => {
    const { userId } = req.params;
    if (userId === 'mock-id') return HttpResponse.json(204);
    return HttpResponse.json(null, { status: 500 });
  }),

  http.get('http://localhost:5050/user/getData', () => {
    return HttpResponse.json(mockUser);
  }),

  http.get('http://localhost:5050/user/noData-id/getAvatarImage', () => {
    return HttpResponse.json(undefined);
  }),

  http.get('http://localhost:5050/user/mock-id/getAvatarImage', () => {
    return HttpResponse.json({
      avatarPath: 'path',
    });
  }),

  http.post('http://localhost:5050/friends/addFriend', () => {
    return HttpResponse.json({}, { status: 204 });
  }),

  http.delete('http://localhost:5050/friends/removeFriend', () => {
    return HttpResponse.json({}, { status: 204 });
  }),
];
