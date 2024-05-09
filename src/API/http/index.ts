import ky from 'ky';
import { afterResponseHook, beforeRequestHook } from './hooks';

const api = ky.create({
  prefixUrl: 'http://localhost:5000', // ? temporary url
  credentials: 'include',
  hooks: {
    beforeRequest: [beforeRequestHook],
    afterResponse: [afterResponseHook],
  },
});

export default api;
