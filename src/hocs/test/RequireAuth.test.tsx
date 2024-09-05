import { screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { RenderWithRouter } from 'tests/helpers/RenderWithRouter';
import { mockUser } from 'mocks/mocks';
import authService from 'API/services/AuthService/AuthService';

vi.mock('modules/Chat/Chat', async (importOriginal) => {
  const mod = await importOriginal<typeof import('modules/Chat/Chat')>();
  return {
    ...mod,
    Chat: vi.fn().mockReturnValue(<div data-testid={'mock-chat-module'} />),
  };
});

const queryClient = new QueryClient();

describe('Require auth hoc tests', () => {
  beforeEach(() => {
    void queryClient.invalidateQueries({ queryKey: ['userData'] });
  });

  it('Check without access token', async () => {
    RenderWithRouter(queryClient, null, `/users/:${mockUser.id}/:${mockUser.name}`);

    expect(await screen.findByTestId('login')).toBeInTheDocument();
  });

  it('Check with access token', async () => {
    authService.saveAccessToken('mock-token');

    RenderWithRouter(queryClient, null, `/users/:${mockUser.id}/:${mockUser.name}`);

    expect(await screen.findByTestId('main-page')).toBeInTheDocument();
  });
});
