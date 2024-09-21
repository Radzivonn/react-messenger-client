import { vi, describe, it, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AddFriendButton } from 'components/FunctionalButtons/AddFriendButton';
import { useAddFriend } from 'hooks/useFriendListMutations/useAddFriend';

vi.mock('hooks/useFriendListMutations/useAddFriend');

vi.mock('components/UI/Loaders/TailSpinner', async (importOriginal) => {
  const mod = await importOriginal<typeof import('components/UI/Loaders/TailSpinner')>();
  return {
    ...mod,
    TailSpinner: vi.fn().mockReturnValue(<div data-testid={'mock-loader'} />),
  };
});

const queryClient = new QueryClient();

describe('Add friend button component UI tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('check button render', () => {
    (useAddFriend as Mock).mockImplementationOnce(() => ({
      isPending: false,
      mutate: () => undefined,
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <AddFriendButton
          userId="mock-user-id"
          friendId="mock-friend-id"
          friendName="mock-friend-name"
        />
      </QueryClientProvider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-loader')).toBe(null);
  });

  it('check loader render', () => {
    (useAddFriend as Mock).mockImplementationOnce(() => ({
      isPending: true,
      mutate: () => undefined,
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <AddFriendButton
          userId="mock-user-id"
          friendId="mock-friend-id"
          friendName="mock-friend-name"
        />
      </QueryClientProvider>,
    );

    expect(screen.queryByRole('button')).toBe(null);
    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();
  });
});
