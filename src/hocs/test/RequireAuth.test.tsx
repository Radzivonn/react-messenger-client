import { screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { RenderWithRouter } from 'tests/helpers/RenderWithRouter';
import { mockUser } from 'mocks/mocks';
import { server } from 'mocks/node';
import { http, HttpResponse } from 'msw';

const VITE_SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

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

  it('Check authorized', async () => {
    server.use(
      http.get(`${VITE_SERVER_API_URL}/user/getData`, () => {
        return HttpResponse.json(mockUser);
      }),
    );

    RenderWithRouter(queryClient, null, `/users/:${mockUser.id}/:${mockUser.name}`);

    expect(await screen.findByTestId('main-page')).toBeInTheDocument();
  });

  it('Check unauthorized', async () => {
    server.use(
      http.get(`${VITE_SERVER_API_URL}/user/getData`, () => {
        return HttpResponse.json(undefined);
      }),
    );

    RenderWithRouter(queryClient, null, `/users/:${mockUser.id}/:${mockUser.name}`);

    expect(await screen.findByTestId('login')).toBeInTheDocument();
  });
});
