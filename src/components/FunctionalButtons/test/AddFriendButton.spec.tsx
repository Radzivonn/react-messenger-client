import { vi, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AddFriendButton } from 'components/FunctionalButtons/AddFriendButton';
import friendListService from 'API/services/FriendListService/FriendListService';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();

describe('Add friend button component func tests', () => {
  it('check adding friend request', async () => {
    const serviceSpy = vi.spyOn(friendListService, 'addFriend');

    render(
      <QueryClientProvider client={queryClient}>
        <AddFriendButton
          userId="mock-user-id"
          friendId="mock-friend-id"
          friendName="mock-friend-name"
        />
      </QueryClientProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(serviceSpy).toHaveBeenCalled();
  });
});
