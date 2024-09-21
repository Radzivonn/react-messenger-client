import { screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import authService from 'API/services/AuthService/AuthService';
import { RenderWithRouter } from 'tests/helpers/RenderWithRouter';
import { formFields } from '../components/LoginForm/formFields';
import { server } from 'mocks/node';
import { http, HttpResponse } from 'msw';
import { mockAuthResponse } from 'mocks/mocks';

const queryClient = new QueryClient();

describe('Login form tests', () => {
  beforeEach(() => {
    authService.removeAccessToken();
    queryClient.clear();
  });

  it('Submit test', async () => {
    server.use(
      http.post('http://localhost:5050/auth/login', () => {
        return HttpResponse.json(mockAuthResponse, { status: 200 });
      }),
    );

    const spyLogin = vi.spyOn(authService, 'login');
    const spySaveAccessToken = vi.spyOn(authService, 'saveAccessToken');

    RenderWithRouter(queryClient, null, '/');

    const emailInput = await screen.findByTestId(formFields[0].name);
    const passwordInput = screen.getByTestId(formFields[1].name);
    const submitButton = screen.getByTestId('login-submit-button');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(emailInput, 'mockemail@gmail.com');
      await userEvent.type(passwordInput, 'qwe123RTY!');
      await userEvent.click(submitButton);
    });

    expect(await screen.findByText('You are successfully logged in!')).toBeInTheDocument();
    expect(await screen.findByTestId('main-page')).toBeInTheDocument();
    expect(spyLogin).toHaveBeenCalled();
    expect(spySaveAccessToken).toHaveBeenCalled();
  });

  it('Submit test with undefined login response', async () => {
    server.use(
      http.post('http://localhost:5050/auth/login', () => {
        return HttpResponse.json(undefined, { status: 200 });
      }),
    );

    const spyLogin = vi.spyOn(authService, 'login');
    const spySaveAccessToken = vi.spyOn(authService, 'saveAccessToken');

    RenderWithRouter(queryClient, null, '/');

    const emailInput = await screen.findByTestId(formFields[0].name);
    const passwordInput = screen.getByTestId(formFields[1].name);
    const submitButton = screen.getByTestId('login-submit-button');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(emailInput, 'mockemail@gmail.com');
      await userEvent.type(passwordInput, 'qwe123RTY!');
      await userEvent.click(submitButton);
    });

    expect(await screen.findByText('This user was not found')).toBeInTheDocument();
    expect(screen.queryByTestId('main-page')).toBe(null);
    expect(spyLogin).toHaveBeenCalled();
    expect(spySaveAccessToken).not.toHaveBeenCalled();
  });
});
