import React from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { TailSpinner } from '../../../components/UI/Spinners/TailSpinner';
import { ChatTab } from '../../../components/UI/Tabs/Chat-tab';
import { MainPageComponentOutletContextType } from '../../../types/types';
import { useChatList } from '../../../hooks/useChat/useChatList';
import { useUserData } from '../../../hooks/useUserData/useUserData';

export const ChatList = () => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const { userId } = useOutletContext<MainPageComponentOutletContextType>();

  const { isFetching: isUserFetching, data: userData } = useUserData();
  const { isFetching, data: chatListData } = useChatList(userId);

  if (isFetching || isUserFetching || !chatListData || !userData) return <TailSpinner />;

  return (
    <>
      {chatListData.map((chat) => {
        const receiverId = chat.participantsIds.find((id) => id !== userId);
        const receiverName = chat.participantsNames.find((name) => name !== userData.name);

        if (!receiverId || !receiverName) throw Error('No valid data');

        const onClickToOpenChat = () => {
          setSearchParams({ chatId: chat.chatId, receiverId, receiverName });
        };

        return (
          <ChatTab
            onClick={() => onClickToOpenChat()}
            key={chat.chatId}
            receiverName={receiverName}
            lastMessage={chat.messages[chat.messages.length - 1]}
          />
        );
      })}
    </>
  );
};
