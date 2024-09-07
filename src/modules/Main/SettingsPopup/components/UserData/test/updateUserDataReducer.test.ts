import userService from 'API/services/UserService/UserService';
import { updateUserDataReducer } from '../updateUserDataReducer';
import { mockResponse } from './mocks/mockResponse';

describe('updateUserDataReducer tests', () => {
  it('check reducer', async () => {
    const spy = vi
      .spyOn(userService, 'updateUserName')
      .mockReturnValue(Promise.resolve(mockResponse));

    await updateUserDataReducer('Name', 'mock-id', 'mock-name');

    expect(spy).toHaveBeenCalledWith('mock-id', 'mock-name');
    expect(spy).toHaveReturnedWith(mockResponse);
  });
});
