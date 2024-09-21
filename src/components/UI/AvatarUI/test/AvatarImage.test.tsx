import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AvatarImage } from 'components/UI/AvatarUI/AvatarImage';
import { act } from 'react';

const queryClient = new QueryClient();

describe('Avatar image component test', () => {
  it('Avatar placeholder render (because no data)', () => {
    vi.mock('components/UI/AvatarUI/AvatarPlaceholder', async (importOriginal) => {
      const mod = await importOriginal<typeof import('components/UI/AvatarUI/AvatarPlaceholder')>();
      return {
        ...mod,
        AvatarPlaceholder: vi.fn().mockReturnValue(<div data-testid={'mock-avatar-placeholder'} />),
      };
    });

    render(
      <QueryClientProvider client={queryClient}>
        <AvatarImage userId="noData-id" name="John" isOnline={false} isOpenable={false} />,
      </QueryClientProvider>,
    );

    const avatarPlaceholder = screen.getByTestId('mock-avatar-placeholder');
    expect(avatarPlaceholder).toBeInTheDocument();
  });

  it('Avatar render with online', async () => {
    vi.mock('components/UI/OnlineStatusMarker/OnlineStatusMarker', async (importOriginal) => {
      const mod =
        await importOriginal<
          typeof import('components/UI/OnlineStatusMarker/OnlineStatusMarker')
        >();
      return {
        ...mod,
        OnlineStatusMarker: vi.fn().mockReturnValue(<div data-testid={'mock-online-marker'} />),
      };
    });

    render(
      <QueryClientProvider client={queryClient}>
        <AvatarImage userId="mock-id" name="John" isOnline={true} isOpenable={false} />,
      </QueryClientProvider>,
    );

    const onlineMarker = await screen.findByTestId('mock-online-marker');
    expect(onlineMarker).toBeInTheDocument();
  });

  it('Check opening avatar by click on it', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AvatarImage userId="mock-id" name="John" isOnline={false} isOpenable={true} />,
      </QueryClientProvider>,
    );

    const avatarImage = await screen.findByRole('img', { name: /avatar/i });
    expect(avatarImage).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(avatarImage);
    });

    const openedImage = await screen.findByRole('img', { name: /opened-image/i });
    expect(openedImage).toBeInTheDocument();
  });
});
