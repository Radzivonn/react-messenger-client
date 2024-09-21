import { FC } from 'react';
import { Button } from '../UI/Button/Button';
import AddFriendIcon from 'assets/icons/add-friend-icon.svg?react';
import { useAddFriend } from 'hooks/useFriendListMutations/useAddFriend';
import { TailSpinner } from '../UI/Loaders/TailSpinner';

interface Props {
  userId: string;
  friendId: string;
  friendName: string;
}

export const AddFriendButton: FC<Props> = ({ userId, friendId, friendName }) => {
  const { isPending, mutate } = useAddFriend(userId, friendId, friendName);

  if (isPending) return <TailSpinner width="30" height="30" wrapperStyle={{ margin: '0' }} />;

  return (
    <Button className="form__button button--icon-only" onClick={() => mutate()}>
      <AddFriendIcon />
    </Button>
  );
};
