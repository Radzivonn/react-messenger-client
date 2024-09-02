import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserTab } from '../User-tab';

// !!!
vi.mock('components/FunctionalButtons/AddFriendButton', async (importOriginal) => {
  const mod = await importOriginal<typeof import('components/FunctionalButtons/AddFriendButton')>();
  return {
    ...mod,
    AddFriendButton: vi.fn().mockReturnValue(<div data-testid={'mock-add-friend-button'} />),
  };
});

vi.mock('components/FunctionalButtons/RemoveFriendButton', async (importOriginal) => {
  const mod =
    await importOriginal<typeof import('components/FunctionalButtons/RemoveFriendButton')>();
  return {
    ...mod,
    RemoveFriendButton: vi.fn().mockReturnValue(<div data-testid={'mock-remove-friend-button'} />),
  };
});

vi.mock('components/FunctionalButtons/WriteToFriendButton', async (importOriginal) => {
  const mod =
    await importOriginal<typeof import('components/FunctionalButtons/WriteToFriendButton')>();
  return {
    ...mod,
    WriteToFriendButton: vi.fn().mockReturnValue(<div data-testid={'mock-write-friend-button'} />),
  };
});

vi.mock('components/UI/AvatarUI/AvatarImage', async (importOriginal) => {
  const mod = await importOriginal<typeof import('components/UI/AvatarUI/AvatarImage')>();
  return {
    ...mod,
    AvatarImage: vi.fn().mockReturnValue(<div data-testid={'mock-avatar-image'} />),
  };
});

describe('User tab component test', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('user tab render', () => {
    render(
      <UserTab
        data-testid={'mock-user-tab'}
        name="John"
        friendId="123"
        userId="321"
        isFriend={false}
        isOnline={false}
      />,
    );

    const userTab = screen.getByTestId('mock-user-tab');
    expect(userTab).toBeInTheDocument();
    expect(userTab).toHaveClass('tab');

    const avatarImage = screen.getByTestId('mock-avatar-image');
    expect(avatarImage).not.toBe(null);

    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('user tab (is friend)', () => {
    render(<UserTab name="John" friendId="123" userId="321" isFriend={true} isOnline={false} />);

    const removeFriendButton = screen.getByTestId('mock-remove-friend-button');
    const writeFriendButton = screen.getByTestId('mock-write-friend-button');

    expect(removeFriendButton).not.toBe(null);
    expect(writeFriendButton).not.toBe(null);
  });

  it('user tab (is not friend)', () => {
    render(<UserTab name="John" friendId="123" userId="321" isFriend={false} isOnline={false} />);
    const addFriendButton = screen.getByTestId('mock-add-friend-button');
    expect(addFriendButton).not.toBe(null);
  });
});
