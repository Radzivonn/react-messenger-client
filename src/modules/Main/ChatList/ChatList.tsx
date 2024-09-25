import React from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { TailSpinner } from 'components/UI/Loaders/TailSpinner';
import { ChatTab } from 'components/UI/Tabs/Chat-tab';
import { MainPageComponentOutletContext } from 'types/types';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import { useFriendsOnlineStatusesStore } from 'store/onlineStatuses/onlineStatusesStore';
import { useChatStore } from 'store/chat/chatStore';

export const ChatList = () => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const { userId } = useOutletContext<MainPageComponentOutletContext>();

  const setIsChatOpened = useAppSettingsStore((state) => state.setIsChatOpened);
  const onlineStatuses = useFriendsOnlineStatusesStore((state) => state.onlineStatuses);

  const chats = useChatStore((state) => state.chats);

  const chatList = [];
  for (const chatId in chats) {
    if (chats[chatId].messages.length !== 0) chatList.push(chats[chatId]);
  }

  if (chatList.length === 0) {
    return <h2 className="text-hint">Your have no chats yet</h2>;
  }

  return (
    <>
      {chatList.map((chat) => {
        const receiver = chat.participants.find((participant) => participant.userId !== userId);

        if (!receiver) return <></>;

        const onClickToOpenChat = () => {
          setSearchParams(
            {
              chatId: chat.chatId,
              receiverId: receiver.userId,
            },
            { replace: true },
          );
          setIsChatOpened(true);
        };

        return (
          <ChatTab
            onClick={() => onClickToOpenChat()}
            key={chat.chatId}
            receiverId={receiver.userId}
            receiverName={receiver.userName}
            lastMessage={chat.messages[chat.messages.length - 1]}
            isOnline={onlineStatuses[receiver.userId] ?? false}
            data-testid="chat-tab"
          />
        );
      })}
    </>
  );
};
