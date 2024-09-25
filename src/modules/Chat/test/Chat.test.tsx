import { render, screen } from '@testing-library/react';
import { Chat } from '../Chat';
import { ClientToServerEvents, ServerToClientEvents, WEBSOCKET_EVENTS } from 'types/types';
import { createServer } from 'node:http';
import { type AddressInfo } from 'node:net';
import { io as ioc, type Socket as ClientSocket } from 'socket.io-client';
import { Server, type Socket as ServerSocket } from 'socket.io';
import { act } from 'react';
import { useChatStore } from 'store/chat/chatStore';
import { useSocketStore } from 'store/socket/socketStore';

type ActualRouterType = typeof import('react-router-dom');
vi.mock('react-router-dom', async () => {
  const actual: ActualRouterType = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(() => [
      new URLSearchParams('chatId=mock-chat-id&receiverId=mock-receiver-id'),
      vi.fn(),
    ]),
  };
});

vi.mock('components/UI/Loaders/TailSpinner', async (importOriginal) => {
  const mod = await importOriginal<typeof import('components/UI/Loaders/TailSpinner')>();
  return {
    ...mod,
    TailSpinner: vi.fn().mockReturnValue(<div data-testid={'mock-loader'} />),
  };
});

vi.mock('../components/FriendDataHeader/FriendDataHeader', async (importOriginal) => {
  const mod =
    await importOriginal<typeof import('../components/FriendDataHeader/FriendDataHeader')>();
  return {
    ...mod,
    FriendDataHeader: vi.fn().mockReturnValue(<div data-testid={'mock-friend-data-header'} />),
  };
});

vi.mock('../components/MessagesList', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../components/MessagesList')>();
  return {
    ...mod,
    MessagesList: vi.fn().mockReturnValue(<div data-testid={'mock-messages-list'} />),
  };
});

vi.mock('../components/InputSection', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../components/InputSection')>();
  return {
    ...mod,
    InputSection: vi.fn().mockReturnValue(<div data-testid={'mock-input-section'} />),
  };
});

describe('Chat module tests', () => {
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

  it('Check loader if no active chat', () => {
    return new Promise(async (resolve) => {
      useSocketStore.setState({ socket: clientSocket });

      serverSocket.on(WEBSOCKET_EVENTS.CREATE_CHAT, ({ chatId, userId, receiverId }) => {
        expect(chatId).toBe('mock-chat-id');
        expect(userId).toBe('mock-user-id');
        expect(receiverId).toBe('mock-receiver-id');

        act(() => {
          useChatStore.setState({
            chats: { 'mock-chat-id': { chatId: 'mock-chat-id', participants: [], messages: [] } },
          });
        });

        expect(screen.queryByTestId('mock-loader')).toBe(null);
        expect(screen.getByTestId('mock-friend-data-header')).toBeInTheDocument();
        expect(screen.getByTestId('mock-messages-list')).toBeInTheDocument();
        expect(screen.getByTestId('mock-input-section')).toBeInTheDocument();
      });

      render(<Chat chatId="mock-chat-id" userId="mock-user-id" userName="mock-username" />);

      expect(screen.getByTestId('mock-loader')).toBeInTheDocument();

      resolve(null);
    });
  });
});
