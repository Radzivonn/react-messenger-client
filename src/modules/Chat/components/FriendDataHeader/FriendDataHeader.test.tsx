import { render, screen } from '@testing-library/react';
import { FriendDataHeader } from './FriendDataHeader';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';

vi.mock('store/onlineStatuses/onlineStatuses', async (importOriginal) => {
  const mod = await importOriginal<typeof import('store/onlineStatuses/onlineStatuses')>();
  return {
    ...mod,
    useFriendsOnlineStatusesStore: vi.fn().mockReturnValue({}),
  };
});

vi.mock('./headers/mobileHeader', async (importOriginal) => {
  const mod = await importOriginal<typeof import('./headers/mobileHeader')>();
  return {
    ...mod,
    MobileHeader: vi.fn().mockReturnValue(<div data-testid={'mock-mobile-header'} />),
  };
});

vi.mock('./headers/desktopHeader', async (importOriginal) => {
  const mod = await importOriginal<typeof import('./headers/desktopHeader')>();
  return {
    ...mod,
    DesktopHeader: vi.fn().mockReturnValue(<div data-testid={'mock-desktop-header'} />),
  };
});

describe('Receiver data header tests', () => {
  it('Check mobile header option', () => {
    useAppSettingsStore.setState({ isMobile: true });

    render(<FriendDataHeader receiverId="mock-id" receiverName="mock-name" />);

    expect(screen.getByTestId('mock-mobile-header'));
  });

  it('Check desktop header option', () => {
    useAppSettingsStore.setState({ isMobile: false });

    render(<FriendDataHeader receiverId="mock-id" receiverName="mock-name" />);

    expect(screen.getByTestId('mock-desktop-header'));
  });
});
