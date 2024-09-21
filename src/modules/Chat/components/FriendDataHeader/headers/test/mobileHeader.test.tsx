import { fireEvent, render, screen } from '@testing-library/react';
import { MobileHeader } from '../mobileHeader';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';

const setSearchParamsMock = vi.fn();
type ActualRouterType = typeof import('react-router-dom');
vi.mock('react-router-dom', async () => {
  const actual: ActualRouterType = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(() => [new URLSearchParams(''), setSearchParamsMock]),
  };
});

describe('Mobile header tests', () => {
  it('Check render and button work', async () => {
    useAppSettingsStore.setState({ isChatOpened: true });

    render(
      <MobileHeader>
        <div data-testid={'mock-user-info'} />
      </MobileHeader>,
    );

    const closeChatButton = screen.getByRole('button');
    expect(closeChatButton).toBeInTheDocument();
    expect(screen.getByTestId('mock-user-info'));

    fireEvent.click(closeChatButton);

    expect(setSearchParamsMock).toHaveBeenCalledWith({}, { replace: true });
    expect(useAppSettingsStore.getState().isChatOpened).toBe(false);
  });
});
