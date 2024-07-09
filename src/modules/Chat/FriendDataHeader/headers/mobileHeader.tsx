import React, { ComponentProps, FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArrowIcon from '../../../../assets/icons/arrow_left_icon.svg?react';
import { Button } from '../../../../components/UI/Button/Button';
import { useAppSettingsStore } from '../../../../store/appSettings/appSettingsStore';
import { AvatarPlaceholder } from '../../../../components/UI/AvatarPlaceholder/AvatarPlaceholder';

interface Props extends ComponentProps<'section'> {
  receiverName: string;
  isOnline: boolean;
}

export const MobileHeader: FC<Props> = ({ receiverName, isOnline }) => {
  const setIsChatOpened = useAppSettingsStore((state) => state.setIsChatOpened);
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
        <AvatarPlaceholder name={receiverName} isOnline={isOnline} />
        <div className="flex flex-col gap-2">
          <h2 className="name"> {receiverName} </h2>
          <p className="online-status"> {isOnline ? 'Online' : 'Offline'} </p>
        </div>
      </div>
    </section>
  );
};
