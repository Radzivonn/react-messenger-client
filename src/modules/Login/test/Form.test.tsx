import { screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import authService from 'API/services/AuthService/AuthService';
import { RenderWithRouter } from 'tests/helpers/RenderWithRouter';
import { formFields } from '../components/LoginForm/formFields';
import { server } from 'mocks/node';
import { http, HttpResponse } from 'msw';
import { mockUser } from 'mocks/mocks';

const VITE_SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

const queryClient = new QueryClient();

describe('Login form tests', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('Submit test', async () => {
    server.use(
      http.post(`${VITE_SERVER_API_URL}/auth/login`, () => {
        return HttpResponse.json(mockUser, { status: 200 });
      }),
      http.get(`${VITE_SERVER_API_URL}/user/getData`, () => {
        return HttpResponse.json(undefined);
      }),
    );

    const spyLogin = vi.spyOn(authService, 'login');

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
      server.use(
        http.get(`${VITE_SERVER_API_URL}/user/getData`, () => {
          return HttpResponse.json(mockUser);
        }),
      );
    });

    expect(await screen.findByText('You are successfully logged in!')).toBeInTheDocument();
    expect(await screen.findByTestId('main-page')).toBeInTheDocument();
    expect(spyLogin).toHaveBeenCalled();
  });

  it('Submit test with undefined response', async () => {
    server.use(
      http.post(`${VITE_SERVER_API_URL}/auth/login`, () => {
        return HttpResponse.json({}, { status: 404 });
      }),
      http.get(`${VITE_SERVER_API_URL}/user/getData`, () => {
        return HttpResponse.json(undefined);
      }),
    );

    const spyLogin = vi.spyOn(authService, 'login');

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
    expect(screen.queryByTestId('login')).toBeInTheDocument();
    expect(spyLogin).toHaveBeenCalled();
  });
});
