import { render, screen } from '@testing-library/react';
import { InputSection } from '../InputSection';
import { ClientToServerEvents, ServerToClientEvents, WEBSOCKET_EVENTS } from 'types/types';
import userEvent from '@testing-library/user-event';
import { createServer } from 'node:http';
import { type AddressInfo } from 'node:net';
import { io as ioc, type Socket as ClientSocket } from 'socket.io-client';
import { Server, type Socket as ServerSocket } from 'socket.io';
import { act } from 'react';
import { getTime } from 'helpers/getTime';

describe('Message sending input component tests', () => {
  let io: Server,
    serverSocket: ServerSocket<ClientToServerEvents, ServerToClientEvents>,
    clientSocket: ClientSocket<ServerToClientEvents, ClientToServerEvents>;

  beforeAll(() => {
    return new Promise((resolve) => {
      const httpServer = createServer();
      io = new Server(httpServer);
      httpServer.listen(() => {
        const port = (httpServer.address() as AddressInfo).port;
        clientSocket = ioc(`http://localhost:${port}`);
        io.on('connection', (socket) => {
          serverSocket = socket;
        });
        clientSocket.on('connect', resolve.bind(this, null));
      });
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.disconnect();
  });

  it('Should return time in h:m format', () => {
    const date = new Date('September 28, 2024 12:00:00');
    expect(getTime(date.toString())).toBe(
      `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`,
    );
  });

  it('Check typing text', () => {
    return new Promise(async (resolve) => {
      /* First "start_typing" event will be called after entering in the input field */
      serverSocket.on(WEBSOCKET_EVENTS.START_TYPING, (chatId, userId) => {
        expect(chatId).toBe('mock-chat-id');
        expect(userId).toBe('mock-user-id');
      });

      /* After 2 seconds delay without typing "stop_typing" event will be called */
      serverSocket.on(WEBSOCKET_EVENTS.STOP_TYPING, (chatId, userId) => {
        expect(chatId).toBe('mock-chat-id');
        expect(userId).toBe('mock-user-id');
        resolve(null);
      });

      render(
        <InputSection
          socket={clientSocket}
          chatId="mock-chat-id"
          userId="mock-user-id"
          userName="mock-username"
        />,
      );

      const textInput = screen.getByRole('textbox');
      expect(textInput).toBeInTheDocument();

      await act(async () => {
        await userEvent.type(textInput, 'q');
      });
    });
  });

  it('Check sending message', () => {
    return new Promise(async (resolve) => {
      serverSocket.on(WEBSOCKET_EVENTS.STOP_TYPING, (chatId, userId) => {
        expect(chatId).toBe('mock-chat-id');
        expect(userId).toBe('mock-user-id');
      });

      serverSocket.on(WEBSOCKET_EVENTS.SEND_MESSAGE, (message) => {
        expect(message.chatId).toBe('mock-chat-id');
        expect(message.name).toBe('mock-username');
        expect(message.message).toBe('mock-message');
        resolve(null);
      });

      render(
        <InputSection
          socket={clientSocket}
          chatId="mock-chat-id"
          userId="mock-user-id"
          userName="mock-username"
        />,
      );

      const textInput = screen.getByRole('textbox');
      expect(textInput).toBeInTheDocument();
      const sendMessageButton = screen.getByTestId('send-message-button');
      expect(sendMessageButton).toBeInTheDocument();

      await act(async () => {
        await userEvent.type(textInput, 'mock-message');
        await userEvent.click(sendMessageButton);
      });
    });
  });

  it('Check emoji picker work', async () => {
    render(
      <InputSection
        socket={clientSocket}
        chatId="mock-chat-id"
        userId="mock-user-id"
        userName="mock-username"
      />,
    );

    const textInput = screen.getByRole('textbox');
    expect(textInput).toBeInTheDocument();
    const emojiPickerButton = screen.getByTestId('emoji-picker-button');
    expect(emojiPickerButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(emojiPickerButton);
    });

    const emojiPicker = screen.getByTestId('emoji-picker');
    expect(emojiPicker).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(emojiPickerButton);
    });

    expect(emojiPicker).not.toBeInTheDocument();
  });
});
