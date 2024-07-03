export interface IFriendListActionButtonProps {
  userId: string;
  friendId: string;
  friendName: string;
}

export interface IWriteToFriendButtonProps extends IFriendListActionButtonProps {
  isOnline: boolean;
}
