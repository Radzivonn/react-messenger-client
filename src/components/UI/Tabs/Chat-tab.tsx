import React, { ComponentProps, FC } from 'react';
import { Tab } from './BaseTab/Tab';

interface Props extends ComponentProps<'section'> {
  name: string;
  lastMessage: string;
  lastMessageTime: string;
}

export const ChatTab: FC<Props> = ({ name, lastMessage, lastMessageTime }) => {
  return (
    <Tab>
      <div className="tab__info_avatar-placeholder">{name.slice(0, 1)}</div>
      <div className="flex w-fit flex-col justify-start gap-1">
        <h3 className="tab__info_name">{name}</h3>
        <p className="tab__info_last-message"> {lastMessage} </p>
      </div>
      <p className="tab__info_message-time">{lastMessageTime}</p>
    </Tab>
  );
};
