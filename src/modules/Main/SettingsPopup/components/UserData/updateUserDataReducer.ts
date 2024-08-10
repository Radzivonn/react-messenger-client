import { editingOptions } from './editingOptions';
import userService from '../../../../../API/services/UserService/UserService';

export const updateUserDataReducer = (
  editingOption: editingOptions,
  ...props: [string, string]
) => {
  switch (editingOption) {
    case 'Name':
      return userService.updateUserName(...props);
  }
};
