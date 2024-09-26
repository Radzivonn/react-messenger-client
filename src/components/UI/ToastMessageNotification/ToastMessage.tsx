import { FC } from 'react';
import { AvatarImage } from 'components/UI/AvatarUI/AvatarImage';
import { Message } from 'types/types';

interface Props {
  message: Message;
  receiverId: string;
}

export const ToastMessage: FC<Props> = ({ message, receiverId }) => {
  return (
    <div className="flex items-center gap-6 ">
      <AvatarImage userId={receiverId} name={message.name} isOnline={false} isOpenable={false} />
      <p> {message.message} </p>
    </div>
  );
};
