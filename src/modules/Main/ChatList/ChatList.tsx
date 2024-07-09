import React from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { TailSpinner } from '../../../components/UI/Spinners/TailSpinner';
import { ChatTab } from '../../../components/UI/Tabs/Chat-tab';
import { MainPageComponentOutletContext } from '../../../types/types';
import { useChatList } from '../../../hooks/useChat/useChatList';
import { useAppSettingsStore } from '../../../store/appSettings/appSettingsStore';
import { useFriendsOnlineStatusesStore } from '../../../store/onlineStatuses/onlineStatuses';

export const ChatList = () => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const { userId, userName } = useOutletContext<MainPageComponentOutletContext>();

  const setIsChatOpened = useAppSettingsStore((state) => state.setIsChatOpened);
  const onlineStatuses = useFriendsOnlineStatusesStore((state) => state.onlineStatuses);

  const { isFetching: isChatListFetching, data: chatListData } = useChatList(userId, userName);

  if (isChatListFetching || !chatListData) {
    return <TailSpinner />;
  }

  return (
    <>
      {chatListData.map((chat) => {
        const receiver = chat.participants.find((participant) => participant.userId !== userId);

        if (!receiver) return <></>;

        const onClickToOpenChat = () => {
          setSearchParams({
            chatId: chat.chatId,
            receiverId: receiver.userId,
          });
          setIsChatOpened(true);
        };

        return (
          <ChatTab
            onClick={() => onClickToOpenChat()}
            key={chat.chatId}
            receiverName={receiver.userName}
            lastMessage={chat.messages[chat.messages.length - 1]}
            isOnline={onlineStatuses[receiver.userId] ?? false}
          />
        );
      })}
    </>
  );
};
