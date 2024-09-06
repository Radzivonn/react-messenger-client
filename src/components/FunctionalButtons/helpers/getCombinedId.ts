export const getCombinedId = (userId: string, friendId: string) =>
  userId > friendId ? userId + friendId : friendId + userId;
