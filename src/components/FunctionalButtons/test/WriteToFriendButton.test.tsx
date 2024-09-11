import { fireEvent, screen } from '@testing-library/react';
import { getCombinedId } from '../helpers/getCombinedId';
import { WriteToFriendButton } from 'components/FunctionalButtons/WriteToFriendButton';
import { RenderWithRouter } from 'tests/helpers/RenderWithRouter';
import { mockUser } from 'mocks/mocks';
import { QueryClient } from '@tanstack/react-query';
import authService from 'API/services/AuthService/AuthService';

vi.mock('modules/Chat/Chat', async (importOriginal) => {
  const mod = await importOriginal<typeof import('modules/Chat/Chat')>();
  return {
    ...mod,
    Chat: vi.fn().mockReturnValue(<div data-testid={'mock-chat-module'} />),
  };
});

const setSearchParamsMock = vi.fn();
type ActualRouterType = typeof import('react-router-dom');
vi.mock('react-router-dom', async () => {
  const actual: ActualRouterType = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(() => [new URLSearchParams('param=oldValue'), setSearchParamsMock]),
  };
});

const mockUserId = 'mock-id';
const mockFriendId = 'mock-friend-id';

const queryClient = new QueryClient();

describe('Write to friend button component tests', () => {
  beforeEach(() => {
    void queryClient.invalidateQueries({ queryKey: ['userData'] });
  });

  it('check getCombinedId function', () => {
    expect(getCombinedId(mockUserId, mockFriendId)).toBe(mockUserId + mockFriendId);
    expect(getCombinedId('123qwe', 'qwe123')).toBe('qwe123' + '123qwe');
    expect(
      getCombinedId('70893c5f-4ce1-4ef6-8d2f-80b228868ff0', '4f91020e-ecae-42da-805e-4a91703d81c8'),
    ).toBe('70893c5f-4ce1-4ef6-8d2f-80b228868ff0' + '4f91020e-ecae-42da-805e-4a91703d81c8');
  });

  it('Check render', () => {
    RenderWithRouter(
      queryClient,
      <WriteToFriendButton userId="mock-id" friendId="mock-friend-id" />,
      `/users/${mockUser.id}/${mockUser.name}/people`,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Check setting search params by click on the button', async () => {
    authService.saveAccessToken('mock-token');

    RenderWithRouter(
      queryClient,
      <WriteToFriendButton userId={mockUserId} friendId={mockFriendId} />,
      `/users/${mockUser.id}/${mockUser.name}/people`,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(setSearchParamsMock).toHaveBeenCalledWith(
      {
        chatId: getCombinedId(mockUserId, mockFriendId),
        receiverId: mockFriendId,
      },
      { replace: true },
    );
  });
});
