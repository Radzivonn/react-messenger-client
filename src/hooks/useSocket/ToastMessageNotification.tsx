import { toast } from 'react-toastify';
import { ToastMessage } from 'components/UI/ToastMessageNotification/ToastMessage';
import { Message } from 'types/types';

export const toastMessage = (message: Message, userId: string) => {
  /* replace user id with empty line and get receiver id (because chat id consists of user and receiver ids) */
  const receiverId = message.chatId.replace(userId, '');

  toast(<ToastMessage message={message} receiverId={receiverId} />, {
    position: 'bottom-right',
    autoClose: 4000,
  });
};
