import React, { ComponentProps, FC, useEffect, useRef, useState } from 'react';
import { Message } from '../../types/types';
import useSocketSetup from '../../hooks/useSocket/useSocketSetup';

interface Props extends ComponentProps<'section'> {
  userId: string;
  receiverId: string;
  chatId: string;
}

export const MessagesList: FC<Props> = ({ userId, receiverId, chatId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const lastMessage = useRef<HTMLDivElement>(null);

  // scroll
  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: 'instant' });
    }, 10);
  }, [messages]);

  useSocketSetup(userId, receiverId, chatId, setMessages);

  if (!messages.length) {
    return <h2 className="m-auto text-xl italic">No messages here yet</h2>;
  }

  return (
    <div className="chat-wrapper__messages-section">
      {[...messages].map((msg, i, arr) => (
        <div
          className="message"
          key={msg.chatId + msg.date + i}
          ref={i === arr.length - 1 ? lastMessage : undefined}
        >
          <p className="message__username">{msg.name}</p>
          <p className="message__text">{msg.message}</p>
          <p className="message__time">{msg.date}</p>
        </div>
      ))}
    </div>
  );
};
