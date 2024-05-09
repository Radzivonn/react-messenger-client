import ky, { AfterResponseHook, BeforeRequestHook } from 'ky';
import AuthService from '../services/AuthService/AuthService';

export const beforeRequestHook: BeforeRequestHook = (req) => {
  req.headers.set('Authorization', AuthService.getAuthHeader());
};

/** This implementation uses a self-invoking function to track retry to prevent the hook function from looping in case of a repeated 401 response */
export const afterResponseHook = (function (): AfterResponseHook {
  let isRetry = false;
  return async (req, options, res) => {
    if (res.status === 401 && !isRetry) {
      try {
        isRetry = true;
        const user = await AuthService.refreshTokens();
        if (user) {
          req.headers.set('Authorization', `Bearer ${user.accessToken}`);
          AuthService.saveAccessToken(user.accessToken);
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
