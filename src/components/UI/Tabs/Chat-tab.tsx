import React, { ComponentProps, FC } from 'react';
import { Tab } from './BaseTab/Tab';
import { Message } from '../../../types/types';

interface Props extends ComponentProps<'section'> {
  receiverName: string;
  lastMessage: Message;
}

export const ChatTab: FC<Props> = ({ receiverName, lastMessage, ...props }) => {
  console.log(receiverName);

  return (
    <Tab {...props}>
      <div className="avatar-placeholder">{receiverName.slice(0, 1)}</div>
      <div className=" flex w-fit max-w-[45%] flex-col justify-start gap-1">
        <h3 className="tab__info_name">{receiverName}</h3>
        <p className="tab__info_last-message"> {lastMessage.message} </p>
      </div>
      <p className="tab__info_message-time">{lastMessage.date}</p>
    </Tab>
  );
};
