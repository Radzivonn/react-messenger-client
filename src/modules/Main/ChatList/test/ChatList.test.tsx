import { act } from 'react';
import { http, HttpResponse } from 'msw';
import { screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { server } from 'mocks/node';
import { ChatList } from '../ChatList';
import { mockChatListData, mockIncorrectChatListData } from 'mocks/mocks';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import userEvent from '@testing-library/user-event';
import { RenderWithRouter } from 'tests/helpers/RenderWithRouter';
import authService from 'API/services/AuthService/AuthService';

const setSearchParamsMock = vi.fn();
type ActualRouterType = typeof import('react-router-dom');
vi.mock('react-router-dom', async () => {
  const actual: ActualRouterType = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: vi.fn(() => ({
      userId: 'mock-id',
      userName: 'mock-name',
    })),
    useSearchParams: vi.fn(() => [new URLSearchParams(''), setSearchParamsMock]),
  };
});

vi.mock('store/onlineStatuses/onlineStatuses', async (importOriginal) => {
  const mod = await importOriginal<typeof import('store/onlineStatuses/onlineStatuses')>();
  return {
    ...mod,
    useFriendsOnlineStatusesStore: vi.fn().mockReturnValue(<div data-testid={'mock-loader'} />),
  };
});

const queryClient = new QueryClient();

describe('Friend list component tests', () => {
  beforeEach(() => {
    useAppSettingsStore.setState({ isChatOpened: false });
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('Check no chats found case', async () => {
    authService.saveAccessToken('mock-token');

    server.use(
      http.get('http://localhost:5050/chat/chatList/:userId/:userName', () => {
        return HttpResponse.json([]);
      }),
    );

    act(() => {
      RenderWithRouter(queryClient, <ChatList />, `/users/mock-id/mock-name/chats`);
    });

    const chatsTabs = screen.queryAllByTestId('chat-tab');
    expect(chatsTabs.length).toBe(0);
  });

  it('Check friends found case, but receive incorrect chat data(with only one participant)', async () => {
    authService.saveAccessToken('mock-token');

    server.use(
      http.get('http://localhost:5050/chat/chatList/:userId/:userName', () => {
        return HttpResponse.json(mockIncorrectChatListData);
      }),
    );

    act(() => {
      RenderWithRouter(queryClient, <ChatList />, `/users/mock-id/mock-name/chats`);
    });

    const chatsTabs = screen.queryAllByTestId('chat-tab');
    expect(chatsTabs.length).toBe(0);
  });

  it('Check friends found case', async () => {
    authService.saveAccessToken('mock-token');

    server.use(
      http.get('http://localhost:5050/chat/chatList/:userId/:userName', () => {
        return HttpResponse.json(mockChatListData);
      }),
    );

    RenderWithRouter(queryClient, <ChatList />, `/users/mock-id/mock-name/chats`);

    const chatsTabs = await screen.findAllByTestId('chat-tab');
    expect(chatsTabs.length).toBe(mockChatListData.length);
    chatsTabs.forEach((tab) => {
      expect(tab).toBeInTheDocument();
    });

    await act(async () => {
      await userEvent.click(chatsTabs[0]);
    });

    expect(useAppSettingsStore.getState().isChatOpened).toBe(true);
    expect(setSearchParamsMock).toHaveBeenCalledWith(
      {
        chatId: 'chat1',
        receiverId: 'mock-receiver-id',
      },
      { replace: true },
    );
  });
});
