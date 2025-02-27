import { http, HttpResponse } from 'msw';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from 'mocks/node';
import { FriendList } from '../FriendList';
import { mockFriendListData } from 'mocks/mocks';

const VITE_SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

type ActualRouterType = typeof import('react-router-dom');
vi.mock('react-router-dom', async () => {
  const actual: ActualRouterType = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: vi.fn(() => ({
      userId: 'mock-id',
    })),
  };
});

vi.mock('components/UI/Loaders/TailSpinner', async (importOriginal) => {
  const mod = await importOriginal<typeof import('components/UI/Loaders/TailSpinner')>();
  return {
    ...mod,
    TailSpinner: vi.fn().mockReturnValue(<div data-testid={'mock-loader'} />),
  };
});

vi.mock('store/onlineStatuses/onlineStatusesStore', async (importOriginal) => {
  const mod = await importOriginal<typeof import('store/onlineStatuses/onlineStatusesStore')>();
  return {
    ...mod,
    useFriendsOnlineStatusesStore: vi.fn().mockReturnValue({}),
  };
});

vi.mock('components/UI/Tabs/User-tab', async (importOriginal) => {
  const mod = await importOriginal<typeof import('components/UI/Tabs/User-tab')>();
  return {
    ...mod,
    UserTab: vi.fn().mockReturnValue(<div data-testid={'mock-user-tab'} />),
  };
});

const queryClient = new QueryClient();

describe('Friend list component tests', () => {
  afterEach(() => {
    queryClient.clear();
  });

  it('Check no friends found case', async () => {
    server.use(
      http.get(`${VITE_SERVER_API_URL}/friends/friendList/:userId`, () => {
        return HttpResponse.json([]);
      }),
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FriendList />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();

    expect(await screen.findByText('Your friends list is empty')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-loader')).toBe(null);
  });

  it('Check friends found case', async () => {
    server.use(
      http.get(`${VITE_SERVER_API_URL}/friends/friendList/:userId`, () => {
        return HttpResponse.json(mockFriendListData);
      }),
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FriendList />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();

    const usersTabs = await screen.findAllByTestId('mock-user-tab');
    expect(usersTabs.length).toBe(mockFriendListData.length);
    usersTabs.forEach((tab) => {
      expect(tab).toBeInTheDocument();
    });

    expect(screen.queryByText('Your friends list is empty')).toBe(null);
    expect(screen.queryByTestId('mock-loader')).toBe(null);
  });
});
