import React, { FC } from 'react';
import { Props } from './types';
import { useReceiverStore } from '../../../../../store/receiver/receiverStore';
import { AvatarImage } from '../../../../../components/UI/AvatarUI/AvatarImage';
import { ThreeDotsLoader } from '../../../../../components/UI/Loaders/ThreeDots';

export const UserInfo: FC<Props> = ({ receiverId, receiverName, isOnline }) => {
  const isReceiverTyping = useReceiverStore((state) => state.isReceiverTyping);

  return (
    <div className="user-info">
      <AvatarImage userId={receiverId} name={receiverName} isOnline={false} isOpenable={true} />
      <div className="user-info-container">
        <h2 className="user-info-name"> {receiverName} </h2>
        {isReceiverTyping ? (
          <div className="flex content-center gap-1">
            <ThreeDotsLoader />
            <p className="user-info-status-text--online">Typing</p>
          </div>
        ) : (
          <p className={`user-info-status-text${isOnline ? '--online' : '--offline'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </p>
        )}
      </div>
    </div>
  );
};
