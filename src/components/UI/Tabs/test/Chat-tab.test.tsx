import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatTab } from '../Chat-tab';
import { Message } from 'types/types';
import { mockMessages } from 'mocks/mocks';
import { getTime } from 'helpers/getTime';

const mockMessage: Message = mockMessages[0];

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

  it('chat tab render', () => {
    render(
      <ChatTab
        data-testid={'mock-chat-tab'}
        receiverId="123"
        receiverName="John"
        lastMessage={mockMessage}
        isOnline={false}
      />,
    );

    const chatTab = screen.getByTestId('mock-chat-tab');
    expect(chatTab).toBeInTheDocument();
    expect(chatTab).toHaveClass('tab');

    const avatarImage = screen.getByTestId('mock-avatar-image');
    expect(avatarImage).not.toBe(null);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText(mockMessage.message)).toBeInTheDocument();
    expect(screen.getByText(getTime(mockMessage.date))).toBeInTheDocument();
  });
});
