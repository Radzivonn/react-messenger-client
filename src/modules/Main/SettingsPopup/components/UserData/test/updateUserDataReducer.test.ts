import userService from 'API/services/UserService/UserService';
import { updateUserDataReducer } from '../updateUserDataReducer';
import { mockAuthResponse } from 'mocks/mocks';

describe('updateUserDataReducer tests', () => {
  it('check reducer', async () => {
    const spy = vi
      .spyOn(userService, 'updateUserName')
      .mockReturnValue(Promise.resolve(mockAuthResponse));

    const response = await updateUserDataReducer('Name', 'mock-id', 'mock-name');

    expect(spy).toHaveBeenCalledWith('mock-id', 'mock-name');
    expect(response).toBe(mockAuthResponse);
  });
});
