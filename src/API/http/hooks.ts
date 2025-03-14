import ky, { AfterResponseHook } from 'ky';
import authService from '../services/AuthService/AuthService';
import { STATUS_CODES } from 'types/types';

/** This implementation uses a self-invoking function to track retry to prevent the hook function from looping in case of a repeated 403 response */
export const afterResponseHook = (function (): AfterResponseHook {
  let isRetry = false;
  return async (req, options, res) => {
    if (res.status === STATUS_CODES.UNAUTHORIZED && !isRetry) {
      try {
        isRetry = true;
        const user = await authService.refreshTokens();
        if (user) {
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
