import React, { ComponentProps, FC } from 'react';
import { useChatSettingsStore } from '../../../store/chatSettings/chatSettingsStore';
import { DesktopHeader } from './headers/desktopHeader';
import { MobileHeader } from './headers/mobileHeader';

interface Props extends ComponentProps<'section'> {
  receiverName: string;
}

export const FriendDataHeader: FC<Props> = ({ receiverName }) => {
  const isMobile = useChatSettingsStore((state) => state.isMobile);

  if (isMobile) {
    return <MobileHeader receiverName={receiverName} />;
  }

  return <DesktopHeader receiverName={receiverName} />;
};
