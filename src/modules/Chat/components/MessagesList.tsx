import { ComponentProps, FC, useEffect, useRef } from 'react';
import { getTime } from 'helpers/getTime';
import { Message } from 'types/types';

interface Props extends ComponentProps<'section'> {
  userName: string;
  messages: Message[];
}

export const MessagesList: FC<Props> = ({ userName, messages }) => {
  const lastMessage = useRef<HTMLDivElement>(null);

  // scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: 'instant' });
    }, 10);

    return () => clearTimeout(timer);
  }, [messages.length]);

  if (messages.length === 0) {
    return <h2 className="text-hint">No messages here yet</h2>;
  }

  return (
    <div className="messages-section">
      {messages.map((message, i, arr) => (
        <div
          className={`message message${message.name === userName ? '--my' : '--receiver'}`}
          key={message.date + i}
          ref={i === arr.length - 1 ? lastMessage : undefined}
        >
          <p className="message__text">{message.message}</p>
          <p className="message__time">{getTime(message.date)}</p>
        </div>
      ))}
    </div>
  );
};
