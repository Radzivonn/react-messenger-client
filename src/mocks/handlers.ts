import { http, HttpResponse } from 'msw';
import { mockUser } from 'mocks/mocks';

export const handlers = [
  http.post('http://localhost:5050/auth/logout/mock-id', () => {
    return HttpResponse.json({}, { status: 204 });
  }),

  http.delete('http://localhost:5050/user/mock-id/removeAccount', () => {
    return HttpResponse.json({}, { status: 204 });
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
