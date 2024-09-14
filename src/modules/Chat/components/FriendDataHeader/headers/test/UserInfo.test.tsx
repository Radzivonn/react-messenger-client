import { render, screen } from '@testing-library/react';
import { mockUser } from 'mocks/mocks';
import { UserInfo } from '../UserInfo';
import { useReceiverStore } from 'store/receiver/receiverStore';

vi.mock('components/UI/AvatarUI/AvatarImage', async (importOriginal) => {
  const mod = await importOriginal<typeof import('components/UI/AvatarUI/AvatarImage')>();
  return {
    ...mod,
    AvatarImage: vi.fn().mockReturnValue(<div data-testid={'mock-avatar-image'} />),
  };
});

vi.mock('components/UI/Loaders/ThreeDots', async (importOriginal) => {
  const mod = await importOriginal<typeof import('components/UI/Loaders/ThreeDots')>();
  return {
    ...mod,
    ThreeDotsLoader: vi.fn().mockReturnValue(<div data-testid={'mock-three-dots-loader'} />),
  };
});

describe('User info component tests', () => {
  it('Check user is not online', async () => {
    useReceiverStore.setState({ isReceiverTyping: false });

    render(<UserInfo receiverId={mockUser.id} receiverName={mockUser.name} isOnline={false} />);

    expect(screen.getByTestId('mock-avatar-image')).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText('Offline')).toBeInTheDocument();

    expect(screen.queryByText('Typing')).toBe(null);
    expect(screen.queryByTestId('mock-three-dots-loader')).toBe(null);
  });

  it('Check user is online', async () => {
    useReceiverStore.setState({ isReceiverTyping: false });

    render(<UserInfo receiverId={mockUser.id} receiverName={mockUser.name} isOnline={true} />);

    expect(screen.getByTestId('mock-avatar-image')).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();

    expect(screen.queryByText('Typing')).toBe(null);
    expect(screen.queryByTestId('mock-three-dots-loader')).toBe(null);
  });

  it('Check user is typing', async () => {
    useReceiverStore.setState({ isReceiverTyping: true });

    render(<UserInfo receiverId={mockUser.id} receiverName={mockUser.name} isOnline={true} />);

    expect(screen.getByTestId('mock-avatar-image')).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText('Typing')).toBeInTheDocument();
    expect(screen.getByTestId('mock-three-dots-loader'));

    expect(screen.queryByText('Online')).toBe(null);
    expect(screen.queryByText('Offline')).toBe(null);
  });
});
