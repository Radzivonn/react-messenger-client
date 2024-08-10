import React, { ChangeEvent, ComponentProps, FC, useRef } from 'react';
import { Button } from '../Button/Button';
import CameraIcon from '../../../assets/icons/camera-icon.svg?react';
import userService from '../../../API/services/UserService/UserService';
import { useQueryClient } from '@tanstack/react-query';

interface Props extends ComponentProps<'button'> {
  userId: string;
}

export const ChangeAvatarButton: FC<Props> = ({ userId, ...props }) => {
  const queryClient = useQueryClient();
  const filePicker = useRef<HTMLInputElement>(null);

  const runFilePicker = () => {
    if (filePicker.current) filePicker.current.click();
  };

  const onChangeFilePicker = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await userService.updateAvatarImage(userId, file);
      void queryClient.invalidateQueries({ queryKey: [userId, 'avatarImage'] });
    }
  };

  return (
    <Button
      {...props}
      className="button--icon-only button--icon-only--with-accent-bg relative translate-x-12 translate-y-12 gap-0"
      rounded
      onClick={() => runFilePicker()}
    >
      <input
        type="file"
        accept="image/*"
        ref={filePicker}
        onChange={(e) => onChangeFilePicker(e)}
        className="hidden"
      />
      <CameraIcon />
    </Button>
  );
};
