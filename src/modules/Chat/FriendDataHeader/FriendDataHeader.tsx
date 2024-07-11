import React, { ComponentProps, FC } from 'react';
import { useAppSettingsStore } from '../../../store/appSettings/appSettingsStore';
import { DesktopHeader } from './headers/desktopHeader';
import { MobileHeader } from './headers/mobileHeader';
import { useFriendsOnlineStatusesStore } from '../../../store/onlineStatuses/onlineStatuses';
import { UserInfo } from './headers/UserInfo';

interface Props extends ComponentProps<'section'> {
  receiverId: string;
  receiverName: string;
}

export const FriendDataHeader: FC<Props> = ({ receiverId, receiverName }) => {
  const isMobile = useAppSettingsStore((state) => state.isMobile);
  const onlineStatuses = useFriendsOnlineStatusesStore((state) => state.onlineStatuses);

  const isReceiverOnline = onlineStatuses[receiverId] ?? false;

  if (isMobile) {
    return (
      <MobileHeader>
        <UserInfo receiverName={receiverName} isOnline={isReceiverOnline} />
      </MobileHeader>
    );
  }

  return (
    <DesktopHeader>
      <UserInfo receiverName={receiverName} isOnline={isReceiverOnline} />
    </DesktopHeader>
  );
};
