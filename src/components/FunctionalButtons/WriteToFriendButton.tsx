import { FC } from 'react';
import { Button } from '../UI/Button/Button';
import WriteToFriendIcon from 'assets/icons/write-pencil.svg?react';
import { useSearchParams } from 'react-router-dom';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import { getCombinedId } from './helpers/getCombinedId';

interface Props {
  userId: string;
  friendId: string;
}

export const WriteToFriendButton: FC<Props> = ({ userId, friendId }) => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const setIsChatOpened = useAppSettingsStore((state) => state.setIsChatOpened);

  const chatId = getCombinedId(userId, friendId);

  const onClickToOpenChat = () => {
    setSearchParams(
      {
        chatId,
        receiverId: friendId,
      },
      { replace: true },
    );
    setIsChatOpened(true);
  };

  return (
    <Button className="form__button button--icon-only" onClick={() => onClickToOpenChat()}>
      <WriteToFriendIcon />
    </Button>
  );
};
