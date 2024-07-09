import React, { ComponentProps, FC } from 'react';
import { useAppSettingsStore } from '../../../store/appSettings/appSettingsStore';
import { DesktopHeader } from './headers/desktopHeader';
import { MobileHeader } from './headers/mobileHeader';
import { useSearchParams } from 'react-router-dom';
import { useFriendsOnlineStatusesStore } from '../../../store/onlineStatuses/onlineStatuses';

interface Props extends ComponentProps<'section'> {
  receiverId: string;
  receiverName: string;
}

export const FriendDataHeader: FC<Props> = ({ receiverId, receiverName }) => {
  const [searchParams] = useSearchParams();
  const isMobile = useAppSettingsStore((state) => state.isMobile);
  const onlineStatuses = useFriendsOnlineStatusesStore((state) => state.onlineStatuses);

  const isReceiverOnline = onlineStatuses[receiverId] ?? false;

  if (isMobile) {
    return <MobileHeader receiverName={receiverName} isOnline={isReceiverOnline} />;
  }

  return <DesktopHeader receiverName={receiverName} isOnline={isReceiverOnline} />;
};
