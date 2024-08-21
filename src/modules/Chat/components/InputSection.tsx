import React, { ComponentProps, FC, useRef, useState } from 'react';
import { TextField } from 'components/UI/TextField/TextField';
import { Button } from 'components/UI/Button/Button';
import { ClientToServerEvents, Message, ServerToClientEvents, WEBSOCKET_EVENTS } from 'types/types';
import { Socket } from 'socket.io-client';
import { useChatStore } from 'store/chatData/chatData';
import MessagePlaneIcon from './assets/message-plane.svg?react';
import EmojiIcon from './assets/emoji-icon.svg?react';
import { EmojiPicker } from './EmojiPicker';

const getTime = () =>
  `${new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`;

interface Props extends ComponentProps<'section'> {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  chatId: string;
  userId: string;
  userName: string;
}

const TYPING_DELAY = 2000; // 2 sec

export const InputSection: FC<Props> = ({ socket, chatId, userId, userName }) => {
  const [inputValue, setInputValue] = useState('');
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const typingTimeout = useRef<NodeJS.Timeout>();
  const addMessage = useChatStore((state) => state.addMessage);

  const sendMessage = () => {
    const message: Message = {
      chatId,
      date: getTime(),
      name: userName,
      message: inputValue,
    };

    clearTimeout(typingTimeout.current);
    socket.emit(WEBSOCKET_EVENTS.STOP_TYPING, chatId, userId);

    socket.emit(WEBSOCKET_EVENTS.SEND_MESSAGE, message);
    addMessage(message);

    setInputValue('');
    setIsEmojiPickerVisible(false);
  };

  const onKeyDownHandler = () => {
    clearTimeout(typingTimeout.current);

    if (!isUserTyping) {
      socket.emit(WEBSOCKET_EVENTS.START_TYPING, chatId, userId);
      setIsUserTyping(true);
    }

    typingTimeout.current = setTimeout(() => {
      socket.emit(WEBSOCKET_EVENTS.STOP_TYPING, chatId, userId);
      setIsUserTyping(false);
    }, TYPING_DELAY);
  };

  return (
    <>
      {isEmojiPickerVisible && <EmojiPicker setInputValue={setInputValue} />}
      <section className="input-section">
        <TextField
          name="message_input"
          placeholder="Write a message..."
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          className=" w-4/5 border-none"
          onKeyDown={() => onKeyDownHandler()}
        />
        <div className="flex">
          <Button
            className={`button--icon-only button--no-hover ${inputValue ? '' : 'button--hidden'}`}
            onClick={sendMessage}
          >
            <MessagePlaneIcon />
          </Button>
          <Button
            className={`button--icon-only button--no-hover`}
            onClick={() => setIsEmojiPickerVisible((prev) => !prev)}
          >
            <EmojiIcon />
          </Button>
        </div>
      </section>
    </>
  );
};
