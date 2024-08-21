import ky from 'ky';
import { afterResponseHook, beforeRequestHook } from './hooks';
import { STATUS_CODES } from 'types/types';

const api = ky.create({
  prefixUrl: 'http://localhost:5050', // ? temporary url
  credentials: 'include',
  hooks: {
    beforeRequest: [beforeRequestHook],
    afterResponse: [afterResponseHook],
  },
  retry: {
    limit: 0,
    statusCodes: [STATUS_CODES.UNAUTHENTICATED],
  },
});

export default api;
