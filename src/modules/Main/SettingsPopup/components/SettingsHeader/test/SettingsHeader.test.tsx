import { screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { SettingsHeader } from '../SettingsHeader';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import userService from 'API/services/UserService/UserService';
import authService from 'API/services/AuthService/AuthService';
import { RenderWithRouter } from 'tests/helpers/RenderWithRouter';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import { http, HttpResponse } from 'msw';
import { server } from 'mocks/node';
import { mockErrorUser } from 'mocks/mocks';

const queryClient = new QueryClient();

describe('Settings header tests', () => {
  beforeEach(() => {
    void queryClient.invalidateQueries({ queryKey: ['userData'] });
    useAppSettingsStore.setState({ isSettingsOpened: true });
  });

  it('Check close settings button', async () => {
    RenderWithRouter(queryClient, <SettingsHeader />, '/users/mock-id/mock-name');

    const closeButton = screen.getByTestId('close-button');

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(closeButton);
    });

    expect(useAppSettingsStore.getState().isSettingsOpened).toBe(false);
  });

  it('Check open-close action menu', async () => {
    RenderWithRouter(queryClient, <SettingsHeader />, '/users/mock-id/mock-name');

    const actionMenuButton = screen.getByTestId('action-menu-button');
    expect(actionMenuButton).toBeInTheDocument();
    expect(screen.queryByTestId('action-menu')).toBe(null);

    // * open menu
    await act(async () => {
      await userEvent.click(actionMenuButton);
    });

    const settingsHeader = screen.getByText('Settings');
    expect(settingsHeader).toBeInTheDocument();
    expect(screen.getByTestId('action-menu')).toBeInTheDocument();

    // * (close menu) click on a random element outside the menu to check if it closes
    await act(async () => {
      await userEvent.click(settingsHeader);
    });

    expect(screen.queryByTestId('action-menu')).toBe(null);
  });

  it('Check open action menu and click logout button', async () => {
    authService.saveAccessToken('mock-token');

    const spyLogout = vi.spyOn(authService, 'logout');
    const spyRemoveAccessToken = vi.spyOn(authService, 'removeAccessToken');

    RenderWithRouter(queryClient, <SettingsHeader />, '/users/mock-id/mock-name');
    const actionMenuButton = screen.getByTestId('action-menu-button');

    expect(actionMenuButton).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Log out' })).toBe(null);
    expect(screen.queryByRole('button', { name: 'Remove account' })).toBe(null);

    await act(async () => {
      await userEvent.click(actionMenuButton);
    });

    const logoutButton = await screen.findByRole('button', { name: 'Log out' });
    const removeAccountButton = await screen.findByRole('button', { name: 'Remove account' });
    expect(logoutButton).toBeInTheDocument();
    expect(removeAccountButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(logoutButton);
    });

    expect(spyLogout).toHaveBeenCalled();
    expect(spyRemoveAccessToken).toHaveBeenCalled();
    expect(useAppSettingsStore.getState().isSettingsOpened).toBe(false);
    expect(await screen.findByTestId('login')).toBeInTheDocument();
  });

  it('Check open action menu and click logout button with error response', async () => {
    server.use(
      http.get('http://localhost:5050/user/getData', () => {
        return HttpResponse.json(mockErrorUser);
      }),
    );

    const spyRemoveAccessToken = vi.spyOn(authService, 'removeAccessToken');

    authService.saveAccessToken('mock-token');

    RenderWithRouter(queryClient, <SettingsHeader />, '/users/mock-error-id/mock-name');

    const actionMenuButton = screen.getByTestId('action-menu-button');
    expect(actionMenuButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(actionMenuButton);
    });

    const logoutButton = await screen.findByRole('button', { name: 'Log out' });
    expect(logoutButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(logoutButton);
    });

    expect(screen.queryByText('You are logged out!')).toBe(null);
    expect(spyRemoveAccessToken).toHaveBeenCalledTimes(0);
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('Check open action menu and click remove account button', async () => {
    authService.saveAccessToken('mock-token');

    const spyRemoveAccount = vi.spyOn(userService, 'removeAccount');
    const spyRemoveAccessToken = vi.spyOn(authService, 'removeAccessToken');

    RenderWithRouter(queryClient, <SettingsHeader />, '/users/mock-id/mock-name');

    const actionMenuButton = screen.getByTestId('action-menu-button');

    expect(actionMenuButton).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Log out' })).toBe(null);
    expect(screen.queryByRole('button', { name: 'Remove account' })).toBe(null);

    await act(async () => {
      await userEvent.click(actionMenuButton);
    });

    const logoutButton = await screen.findByRole('button', { name: 'Log out' });
    const removeAccountButton = await screen.findByRole('button', { name: 'Remove account' });
    expect(logoutButton).toBeInTheDocument();
    expect(removeAccountButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(removeAccountButton);
    });

    expect(screen.getByText('You have removed your account!')).toBeInTheDocument();
    expect(spyRemoveAccount).toHaveBeenCalled();
    expect(spyRemoveAccessToken).toHaveBeenCalled();
    expect(useAppSettingsStore.getState().isSettingsOpened).toBe(false);
    expect(await screen.findByTestId('registration')).toBeInTheDocument();
  });

  it('Check open action menu and click remove account button with error response', async () => {
    server.use(
      http.get('http://localhost:5050/user/getData', () => {
        return HttpResponse.json(mockErrorUser);
      }),
    );
    const spyRemoveAccessToken = vi.spyOn(authService, 'removeAccessToken');

    authService.saveAccessToken('mock-token');

    RenderWithRouter(queryClient, <SettingsHeader />, '/users/mock-id/mock-name');

    const actionMenuButton = screen.getByTestId('action-menu-button');
    expect(actionMenuButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(actionMenuButton);
    });

    const removeAccountButton = await screen.findByRole('button', { name: 'Remove account' });
    expect(removeAccountButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(removeAccountButton);
    });

    expect(screen.queryByText('You have removed your account!')).toBe(null);
    expect(spyRemoveAccessToken).toHaveBeenCalledTimes(0);
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
});