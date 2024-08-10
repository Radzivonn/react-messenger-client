import React, { ComponentProps, FC, useState } from 'react';
import { TextField } from '../../../../../components/UI/TextField/TextField';
import { editingOptions } from './editingOptions';
import { Button } from '../../../../../components/UI/Button/Button';
import { useQueryClient } from '@tanstack/react-query';
import { updateUserDataReducer } from './updateUserDataReducer';
import authService from '../../../../../API/services/AuthService/AuthService';

interface Props extends ComponentProps<'section'> {
  userId: string;
  currentInfo: string;
  editingOption: editingOptions;
  onCancelCallback: () => void;
}

export const ChangeInfoPopup: FC<Props> = ({
  className,
  userId,
  currentInfo,
  editingOption,
  onCancelCallback,
}) => {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState(currentInfo);

  const onUpdateData = async () => {
    const user = await updateUserDataReducer(editingOption, userId, inputValue);
    if (user) {
      authService.saveAccessToken(user.accessToken);
      void queryClient.invalidateQueries({ queryKey: ['userData'] });
    }
  };

  return (
    <section className={`popup-wrapper change-option-popup-wrapper ${className}`}>
      <div className="popup-content">
        <div className="popup-header">
          <h2 className="text-xl"> Edit your {editingOption} </h2>
        </div>
        <TextField
          name="change_option_input"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          className="border-b-2 border-[var(--accent-color-1-default)] text-lg"
        />
        <div className="popup-footer">
          <Button className="border-none" onClick={() => onCancelCallback()}>
            Cancel
          </Button>
          <Button className="border-none" onClick={() => onUpdateData()}>
            Save
          </Button>
        </div>
      </div>
    </section>
  );
};
