import { screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import authService from 'API/services/AuthService/AuthService';
import { RenderWithRouter } from 'tests/helpers/RenderWithRouter';
import { profileFormFields } from '../components/RegistrationForm/formFields';
import { server } from 'mocks/node';
import { http, HttpResponse } from 'msw';
import { mockUser } from 'mocks/mocks';

const VITE_SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

const queryClient = new QueryClient();

describe('Registration form tests', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('Submit test', async () => {
    server.use(
      http.post(`${VITE_SERVER_API_URL}/auth/registration`, () => {
        return HttpResponse.json(mockUser, { status: 200 });
      }),
      http.get(`${VITE_SERVER_API_URL}/user/getData`, () => {
        return HttpResponse.json(undefined);
      }),
    );

    const spyRegister = vi.spyOn(authService, 'register');

    RenderWithRouter(queryClient, null, '/registration');

    const nameInput = await screen.findByTestId(profileFormFields[0].name);
    const emailInput = screen.getByTestId(profileFormFields[1].name);
    const passwordInput = screen.getByTestId(profileFormFields[2].name);
    const submitButton = screen.getByTestId('registration-submit-button');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(nameInput, 'John');
      await userEvent.type(emailInput, 'mockemail@gmail.com');
      await userEvent.type(passwordInput, 'qwe123RTY!');
      await userEvent.click(submitButton);
      server.use(
        http.get(`${VITE_SERVER_API_URL}/user/getData`, () => {
          return HttpResponse.json(mockUser);
        }),
      );
    });

    expect(await screen.findByText('You are successfully registered!')).toBeInTheDocument();
    expect(await screen.findByTestId('main-page')).toBeInTheDocument();
    expect(spyRegister).toHaveBeenCalled();
  });

  it('Submit test with undefined response', async () => {
    server.use(
      http.post(`${VITE_SERVER_API_URL}/auth/registration`, () => {
        return HttpResponse.json(undefined, { status: 404 });
      }),
      http.get(`${VITE_SERVER_API_URL}/user/getData`, () => {
        return HttpResponse.json(undefined);
      }),
    );

    const spyRegister = vi.spyOn(authService, 'register');

    RenderWithRouter(queryClient, null, '/registration');

    const nameInput = await screen.findByTestId(profileFormFields[0].name);
    const emailInput = screen.getByTestId(profileFormFields[1].name);
    const passwordInput = screen.getByTestId(profileFormFields[2].name);
    const submitButton = screen.getByTestId('registration-submit-button');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(nameInput, 'John');
      await userEvent.type(emailInput, 'mockemail@gmail.com');
      await userEvent.type(passwordInput, 'qwe123RTY!');
      await userEvent.click(submitButton);
    });

    expect(await screen.findByText('This user was not found')).toBeInTheDocument();
    expect(screen.queryByTestId('main-page')).toBe(null);
    expect(screen.queryByTestId('registration')).toBeInTheDocument();
    expect(spyRegister).toHaveBeenCalled();
  });
});
