import React, { ComponentProps, FC } from 'react';
import { Button } from '../../components/UI/Button/Button';
import { useSearchParams } from 'react-router-dom';
import { useReceiverStore } from '../../store/receiver/receiverStore';
import { useChatSettingsStore } from '../../store/chatSettings/chatSettingsStore';

interface Props extends ComponentProps<'section'> {
  receiverName: string;
}

export const FriendDataHeader: FC<Props> = ({ receiverName }) => {
  const setIsChatOpened = useChatSettingsStore((state) => state.setIsChatOpened);
  const isReceiverOnline = useReceiverStore((state) => state.isReceiverOnline);
  const [_searchParams, setSearchParams] = useSearchParams();

  const onCloseChat = () => {
    setSearchParams({});
    setIsChatOpened(false);
  };

  return (
    <section className="friend-header">
      <Button className="button--icon-only" onClick={() => onCloseChat()}>
        ←
      </Button>
      <div className="flex flex-col gap-2">
        <h2 className="name"> {receiverName} </h2>
        <p className="online-status"> {isReceiverOnline ? 'Online' : 'Offline'} </p>
      </div>
      <div className="avatar-placeholder">{receiverName?.slice(0, 1)}</div>
    </section>
  );
};
