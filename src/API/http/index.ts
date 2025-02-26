import ky from 'ky';
import { afterResponseHook, beforeRequestHook } from './hooks';
import { STATUS_CODES } from 'types/types';

const VITE_SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

const api = ky.create({
  prefixUrl: `${VITE_SERVER_API_URL}`,
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
