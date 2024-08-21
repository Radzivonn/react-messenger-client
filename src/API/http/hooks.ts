import ky, { AfterResponseHook, BeforeRequestHook } from 'ky';
import authService from '../services/AuthService/AuthService';
import { STATUS_CODES } from 'types/types';

export const beforeRequestHook: BeforeRequestHook = (req) => {
  req.headers.set('Authorization', authService.getAuthHeader());
};

/** This implementation uses a self-invoking function to track retry to prevent the hook function from looping in case of a repeated 403 response */
export const afterResponseHook = (function (): AfterResponseHook {
  let isRetry = false;
  return async (req, options, res) => {
    if (res.status === STATUS_CODES.UNAUTHORIZED && !isRetry) {
      try {
        isRetry = true;
        const user = await authService.refreshTokens();
        if (user) {
          req.headers.set('Authorization', `Bearer ${user.accessToken}`);
          authService.saveAccessToken(user.accessToken);
          return ky(req);
        }
      } catch (e) {
        console.error(e);
      }
    }
    isRetry = false;
    return res;
  };
})();
