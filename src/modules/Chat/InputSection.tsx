import React, { ComponentProps, FC, useState } from 'react';
import { TextField } from '../../components/UI/TextField/TextField';
import { Button } from '../../components/UI/Button/Button';
import { Message, WEBSOCKET_EVENTS } from '../../types/types';
import { useSocketStore } from '../../store/socket/socketStore';

const getTime = () =>
  `${new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`;

interface Props extends ComponentProps<'section'> {
  chatId: string;
  userName: string;
}

export const InputSection: FC<Props> = ({ chatId, userName }) => {
  const socket = useSocketStore((state) => state.socket);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    if (socket && inputValue.length) {
      const message: Message = {
        chatId,
        date: getTime(),
        name: userName,
        message: inputValue,
      };
      socket.emit(WEBSOCKET_EVENTS.SEND_MESSAGE, message);
    }
  };

  return (
    <section className="chat-wrapper__input-section">
      <TextField
        name="message_input"
        placeholder="Write a message..."
        autoComplete="off"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        className=" w-4/5"
      />
      <Button onClick={sendMessage} disabled={inputValue ? false : true}>
        Send
      </Button>
    </section>
  );
};
