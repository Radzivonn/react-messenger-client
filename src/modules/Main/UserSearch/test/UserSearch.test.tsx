import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from 'mocks/node';
import { UserSearch } from '../UserSearch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockSearchData, mockFriendListData } from 'mocks/mocks';

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

vi.mock('components/FunctionalButtons/RemoveFriendButton', async (importOriginal) => {
  const mod =
    await importOriginal<typeof import('components/FunctionalButtons/RemoveFriendButton')>();
  return {
    ...mod,
    RemoveFriendButton: vi.fn().mockReturnValue(<div data-testid="mock-remove-friend-button" />),
  };
});

vi.mock('components/FunctionalButtons/WriteToFriendButton', async (importOriginal) => {
  const mod =
    await importOriginal<typeof import('components/FunctionalButtons/WriteToFriendButton')>();
  return {
    ...mod,
    WriteToFriendButton: vi.fn().mockReturnValue(<div data-testid="mock-write-friend-button" />),
  };
});

vi.mock('components/UI/AvatarUI/AvatarImage', async (importOriginal) => {
  const mod = await importOriginal<typeof import('components/UI/AvatarUI/AvatarImage')>();
  return {
    ...mod,
    AvatarImage: vi.fn().mockReturnValue(<div data-testid="mock-avatar" />),
  };
});

const queryClient = new QueryClient();

describe('User search component tests', () => {
  afterEach(() => {
    queryClient.clear();
  });

  it('Check no users found case', async () => {
    server.use(
      http.get('http://localhost:5050/friends/:userId/searching/:search', () => {
        return HttpResponse.json([]);
      }),
      http.get('http://localhost:5050/friends/friendList/:userId', () => {
        return HttpResponse.json([]);
      }),
    );

    render(
      <QueryClientProvider client={queryClient}>
        <UserSearch />
      </QueryClientProvider>,
    );

    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();
    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'search' } });

    await waitFor(() => {
      expect(screen.getByText('No such users were found')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-loader')).toBe(null);
    });
  });

  it('Check users found case', async () => {
    server.use(
      http.get('http://localhost:5050/friends/:userId/searching/:search', () => {
        return HttpResponse.json(mockSearchData);
      }),
      http.get('http://localhost:5050/friends/friendList/:userId', () => {
        return HttpResponse.json(mockFriendListData);
      }),
    );

    render(
      <QueryClientProvider client={queryClient}>
        <UserSearch />
      </QueryClientProvider>,
    );

    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();
    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'search' } });

    await waitFor(() => {
      expect(screen.getByText(mockSearchData[0].name)).toBeInTheDocument();
      expect(screen.getByTestId('mock-avatar')).toBeInTheDocument();
      expect(screen.getByTestId('mock-remove-friend-button')).toBeInTheDocument();
      expect(screen.getByTestId('mock-write-friend-button')).toBeInTheDocument();
      expect(screen.queryByTestId('No such users were found')).toBe(null);
      expect(screen.queryByTestId('mock-loader')).toBe(null);
    });
  });
});
