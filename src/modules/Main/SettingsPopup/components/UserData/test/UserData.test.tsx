import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userService from 'API/services/UserService/UserService';
import authService from 'API/services/AuthService/AuthService';
import { mockResponse } from './mocks/mockResponse';
import userEvent from '@testing-library/user-event';
import { UserData } from '../UserData';

vi.mock('components/UI/AvatarUI/AvatarImage', async (importOriginal) => {
  const mod = await importOriginal<typeof import('components/UI/AvatarUI/AvatarImage')>();
  return {
    ...mod,
    AvatarImage: vi.fn().mockReturnValue(<div data-testid={'mock-avatar-image'} />),
  };
});

vi.mock('components/UI/AvatarUI/ChangeAvatarButton', async (importOriginal) => {
  const mod = await importOriginal<typeof import('components/UI/AvatarUI/ChangeAvatarButton')>();
  return {
    ...mod,
    ChangeAvatarButton: vi.fn().mockReturnValue(<div data-testid={'mock-change-avatar-button'} />),
  };
});

const queryClient = new QueryClient();

describe('User data block tests', async () => {
  it('Check click on open popup button with click on cancel', async () => {
    authService.saveAccessToken('mock-token');

    render(
      <QueryClientProvider client={queryClient}>
        <UserData />
      </QueryClientProvider>,
    );

    expect(await screen.findByTestId('user-data-block')).toBeInTheDocument();
    expect(await screen.findByTestId('mock-avatar-image')).toBeInTheDocument();

    const nameOption = await screen.findByTestId('name-option');
    expect(nameOption).toBeInTheDocument();

    await userEvent.click(nameOption);

    expect(screen.getByTestId('editing-popup')).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    await userEvent.click(cancelButton);
    expect(screen.queryByTestId('editing-popup')).toBe(null);
  });

  it('Check click on open popup button with click on save', async () => {
    const spyUpdateUserName = vi
      .spyOn(userService, 'updateUserName')
      .mockReturnValue(Promise.resolve(mockResponse));
    const spySaveAccessToken = vi.spyOn(authService, 'saveAccessToken');

    authService.saveAccessToken('mock-token');

    render(
      <QueryClientProvider client={queryClient}>
        <UserData />
      </QueryClientProvider>,
    );

    expect(await screen.findByTestId('user-data-block')).toBeInTheDocument();
    expect(await screen.findByTestId('mock-avatar-image')).toBeInTheDocument();

    const nameOption = await screen.findByTestId('name-option');
    expect(nameOption).toBeInTheDocument();

    await userEvent.click(nameOption);

    expect(screen.getByTestId('editing-popup')).toBeInTheDocument();

    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).toBeInTheDocument();

    await userEvent.click(saveButton);

    expect(spyUpdateUserName).toHaveBeenCalled();
    expect(spySaveAccessToken).toHaveBeenCalled();
  });
});
