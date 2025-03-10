import { ComponentProps, FC, useRef, useState } from 'react';
import { TextField } from 'components/UI/TextField/TextField';
import { Button } from 'components/UI/Button/Button';
import { ClientToServerEvents, Message, ServerToClientEvents, WEBSOCKET_EVENTS } from 'types/types';
import { Socket } from 'socket.io-client';
import { useChatStore } from 'store/chat/chatStore';
import MessagePlaneIcon from '../assets/message-plane.svg?react';
import EmojiIcon from '../assets/emoji-icon.svg?react';
import { EmojiPicker } from './EmojiPicker';

interface Props extends ComponentProps<'section'> {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  chatId: string;
  userId: string;
  userName: string;
}

const TYPING_DELAY = 2000; // 2 sec
const MAX_TEXT_LENGTH = 255; // max symbol count of input text

export const InputSection: FC<Props> = ({ socket, chatId, userId, userName }) => {
  const [inputValue, setInputValue] = useState('');
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const typingTimeout = useRef<NodeJS.Timeout>();
  const addMessage = useChatStore((state) => state.addMessage);

  const sendMessage = () => {
    const message: Message = {
      chatId,
      date: new Date().toString(),
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
          maxLength={MAX_TEXT_LENGTH}
          className="w-4/5 border-none"
          onKeyDown={() => onKeyDownHandler()}
        />
        <div className="flex">
          <Button
            data-testid="send-message-button"
            className={`button--icon-only button--no-hover ${inputValue ? '' : 'button--hidden'}`}
            onClick={() => sendMessage()}
          >
            <MessagePlaneIcon />
          </Button>
          <Button
            data-testid="emoji-picker-button"
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
