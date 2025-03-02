import { act } from 'react';
import { screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { ChatList } from '../ChatList';
import { mockChatListData, mockIncorrectChatListData } from 'mocks/mocks';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import userEvent from '@testing-library/user-event';
import { RenderWithRouter } from 'tests/helpers/RenderWithRouter';
import { useChatStore } from 'store/chat/chatStore';

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

vi.mock('store/onlineStatuses/onlineStatusesStore', async (importOriginal) => {
  const mod = await importOriginal<typeof import('store/onlineStatuses/onlineStatusesStore')>();
  return {
    ...mod,
    useFriendsOnlineStatusesStore: vi.fn().mockReturnValue({}),
  };
});

const queryClient = new QueryClient();

describe('Chat list component tests', () => {
  beforeEach(() => {
    useAppSettingsStore.setState({ isChatOpened: false });
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('Check no chats found case', async () => {
    useChatStore.setState({
      chats: {},
    });

    act(() => {
      RenderWithRouter(queryClient, <ChatList />, `/users/mock-id/mock-name/chats`);
    });

    const chatsTabs = screen.queryAllByTestId('chat-tab');
    expect(chatsTabs.length).toBe(0);
  });

  it('Check chats found case, but receive incorrect chat data(with only one participant)', async () => {
    useChatStore.setState({
      chats: mockIncorrectChatListData,
    });

    act(() => {
      RenderWithRouter(queryClient, <ChatList />, `/users/mock-id/mock-name/chats`);
    });

    const chatsTabs = screen.queryAllByTestId('chat-tab');
    expect(chatsTabs.length).toBe(0);
  });

  it('Check friends found case', async () => {
    useChatStore.setState({
      chats: mockChatListData,
    });

    RenderWithRouter(queryClient, <ChatList />, `/users/mock-id/mock-name/chats`);

    const chatsTabs = await screen.findAllByTestId('chat-tab');

    expect(chatsTabs).toHaveLength(Object.keys(mockChatListData).length);
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
