import React from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { TailSpinner } from '../../../components/UI/Spinners/TailSpinner';
import { ChatTab } from '../../../components/UI/Tabs/Chat-tab';
import { MainPageComponentOutletContext } from '../../../types/types';
import { useChatList } from '../../../hooks/useChat/useChatList';
import { useQueryClient } from '@tanstack/react-query';
import { useChatSettingsStore } from '../../../store/chatSettings/chatSettingsStore';
import { useFriendList } from '../../../hooks/useFriendList/useFriendList';

export const ChatList = () => {
  const queryClient = useQueryClient();
  const [_searchParams, setSearchParams] = useSearchParams();
  const { userId, userName } = useOutletContext<MainPageComponentOutletContext>();

  const setIsChatOpened = useChatSettingsStore((state) => state.setIsChatOpened);

  const {
    isFetching: isChatListFetching,
    data: chatListData,
    isError: isChatListError,
  } = useChatList(userId, userName);
  const {
    isFetching: isFriendListFetching,
    data: friendListData,
    isError: isFriendListError,
  } = useFriendList(userId);

  // ??? Сделано для инвалидации данных пользователя с последующей проверкой через RequireAuth hoc на авторизацию
  if (isChatListError || isFriendListError) {
    void queryClient.invalidateQueries({ queryKey: ['userData'] });
  }

  if (isChatListFetching || isFriendListFetching || !friendListData || !chatListData) {
    return <TailSpinner />;
  }

  const getOnlineStatus = (id: string) => {
    const userWithOnlineStatus = friendListData.find((friend) => friend.id === id);
    if (!userWithOnlineStatus) return false;
    return userWithOnlineStatus.online;
  };

  return (
    <>
      {chatListData.map((chat) => {
        const receiver = chat.participants.find((user) => user.userId !== userId);

        if (!receiver) return <></>;

        const onlineStatus = getOnlineStatus(receiver.userId);

        const onClickToOpenChat = () => {
          setSearchParams({
            chatId: chat.chatId,
            receiverId: receiver.userId,
            isOnline: String(onlineStatus),
          });
          setIsChatOpened(true);
        };

        return (
          <ChatTab
            onClick={() => onClickToOpenChat()}
            key={chat.chatId}
            receiverName={receiver.userName}
            lastMessage={chat.messages[chat.messages.length - 1]}
            isOnline={onlineStatus}
          />
        );
      })}
    </>
  );
};
