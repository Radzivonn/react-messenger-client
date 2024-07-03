import React, { ComponentProps, FC } from 'react';
import { useChatSettingsStore } from '../../../store/chatSettings/chatSettingsStore';
import { DesktopHeader } from './headers/desktopHeader';
import { MobileHeader } from './headers/mobileHeader';
import { useSearchParams } from 'react-router-dom';

interface Props extends ComponentProps<'section'> {
  receiverName: string;
}

export const FriendDataHeader: FC<Props> = ({ receiverName }) => {
  const [searchParams] = useSearchParams();
  const isReceiverOnline = searchParams.get('isOnline');
  const isMobile = useChatSettingsStore((state) => state.isMobile);

  if (isMobile) {
    return <MobileHeader receiverName={receiverName} isOnline={isReceiverOnline === 'true'} />;
  }

  return <DesktopHeader receiverName={receiverName} isOnline={isReceiverOnline === 'true'} />;
};
