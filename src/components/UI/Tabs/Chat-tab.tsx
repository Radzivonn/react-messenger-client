import React, { ComponentProps, FC } from 'react';
import { Tab } from './BaseTab/Tab';
import { Message } from '../../../types/types';
import { AvatarImage } from '../AvatarUI/AvatarImage';

interface Props extends ComponentProps<'section'> {
  receiverId: string;
  receiverName: string;
  lastMessage: Message;
  isOnline: boolean;
}

export const ChatTab: FC<Props> = ({
  receiverId,
  receiverName,
  lastMessage,
  isOnline,
  ...props
}) => {
  return (
    <Tab {...props} className="tab--with-highlight">
      <AvatarImage userId={receiverId} name={receiverName} isOnline={isOnline} />
      <div className="ml-3 flex w-fit max-w-[45%] flex-col justify-start gap-1">
        <h3 className="tab__info_name">{receiverName}</h3>
        <p className="tab__info_last-message"> {lastMessage.message} </p>
      </div>
      <p className="tab__info_message-time">{lastMessage.date}</p>
    </Tab>
  );
};
