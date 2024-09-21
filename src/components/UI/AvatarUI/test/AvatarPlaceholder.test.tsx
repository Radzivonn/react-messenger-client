import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AvatarPlaceholder } from 'components/UI/AvatarUI/AvatarPlaceholder';

const mockName = 'John';

describe('Avatar placeholder component test', () => {
  it('Avatar placeholder render)', () => {
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

    render(<AvatarPlaceholder name={mockName} isOnline={true} />);

    const onlineMarker = screen.getByTestId('mock-online-marker');
    expect(onlineMarker).toBeInTheDocument();

    expect(screen.getByText(mockName.slice(0, 1)));
  });
});
