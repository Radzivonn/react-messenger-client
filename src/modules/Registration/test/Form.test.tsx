import { screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import authService from 'API/services/AuthService/AuthService';
import { RenderWithRouter } from 'tests/helpers/RenderWithRouter';
import { profileFormFields } from '../components/RegistrationForm/formFields';
import { server } from 'mocks/node';
import { http, HttpResponse } from 'msw';
import { mockAuthResponse } from 'mocks/mocks';

const queryClient = new QueryClient();

describe('Registration form tests', () => {
  beforeEach(() => {
    authService.removeAccessToken();
    queryClient.clear();
  });

  it('Submit test', async () => {
    server.use(
      http.post('http://localhost:5050/auth/registration', () => {
        return HttpResponse.json(mockAuthResponse, { status: 200 });
      }),
    );

    const spyRegister = vi.spyOn(authService, 'register');
    const spySaveAccessToken = vi.spyOn(authService, 'saveAccessToken');

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

    expect(await screen.findByText('You are successfully registered!')).toBeInTheDocument();
    expect(await screen.findByTestId('main-page')).toBeInTheDocument();
    expect(spyRegister).toHaveBeenCalled();
    expect(spySaveAccessToken).toHaveBeenCalled();
  });

  it('Submit test with undefined login response', async () => {
    server.use(
      http.post('http://localhost:5050/auth/registration', () => {
        return HttpResponse.json({}, { status: 404 });
      }),
    );

    const spyRegister = vi.spyOn(authService, 'register');
    const spySaveAccessToken = vi.spyOn(authService, 'saveAccessToken');

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
    expect(spyRegister).toHaveBeenCalled();
    expect(spySaveAccessToken).not.toHaveBeenCalled();
  });
});
