import React, { ComponentProps, FC, useEffect, useRef } from 'react';
import { Message } from '../../types/types';

interface Props extends ComponentProps<'section'> {
  messages: Message[];
}

export const MessagesList: FC<Props> = ({ messages }) => {
  const lastMessage = useRef<HTMLDivElement>(null);

  // scroll
  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: 'instant' });
    }, 10);
  }, [messages]);

  if (!messages.length) {
    return <h2 className="text-hint">No messages here yet</h2>;
  }

  return (
    <div className="chat-wrapper__messages-section">
      {messages.map((message, i, arr) => (
        <div
          className="message"
          key={message.date + i}
          ref={i === arr.length - 1 ? lastMessage : undefined}
        >
          <p className="message__username">{message.name}</p>
          <p className="message__text">{message.message}</p>
          <p className="message__time">{message.date}</p>
        </div>
      ))}
    </div>
  );
};
