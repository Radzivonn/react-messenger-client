import React, { ComponentProps, FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArrowIcon from '../../../../assets/icons/arrow_left_icon.svg?react';
import { Button } from '../../../../components/UI/Button/Button';
import { useChatSettingsStore } from '../../../../store/chatSettings/chatSettingsStore';
import { useReceiverStore } from '../../../../store/receiver/receiverStore';

interface Props extends ComponentProps<'section'> {
  receiverName: string;
}

export const MobileHeader: FC<Props> = ({ receiverName }) => {
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
        <ArrowIcon className="icon w-7" />
      </Button>
      <div className="m-auto flex gap-5">
        <div className="avatar-placeholder">{receiverName?.slice(0, 1)}</div>
        <div className="flex flex-col gap-2">
          <h2 className="name"> {receiverName} </h2>
          <p className="online-status"> {isReceiverOnline ? 'Online' : 'Offline'} </p>
        </div>
      </div>
    </section>
  );
};
