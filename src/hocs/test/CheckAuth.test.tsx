import { screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { RenderWithRouter } from 'tests/helpers/RenderWithRouter';
import { server } from 'mocks/node';
import { http, HttpResponse } from 'msw';
import { mockUser } from 'mocks/mocks';

const VITE_SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

vi.mock('modules/Chat/Chat', async (importOriginal) => {
  const mod = await importOriginal<typeof import('modules/Chat/Chat')>();
  return {
    ...mod,
    Chat: vi.fn().mockReturnValue(<div data-testid={'mock-chat-module'} />),
  };
});

const queryClient = new QueryClient();

describe('Check auth hoc tests', () => {
  beforeEach(() => {
    server.use(
      http.get(`${VITE_SERVER_API_URL}/user/getData`, () => {
        return HttpResponse.json(undefined);
      }),
    );
    void queryClient.invalidateQueries({ queryKey: ['userData'] });
  });

  it('Check default login route', async () => {
    RenderWithRouter(queryClient, null, `/`);

    expect(await screen.findByTestId('login')).toBeInTheDocument();
  });

  it('Check registration route', async () => {
    RenderWithRouter(queryClient, null, `/registration`);

    expect(await screen.findByTestId('registration')).toBeInTheDocument();
  });

  it('Check authorized', async () => {
    server.use(
      http.get(`${VITE_SERVER_API_URL}/user/getData`, () => {
        return HttpResponse.json(mockUser);
      }),
    );

    RenderWithRouter(queryClient, null, `/`);

    expect(screen.queryByTestId('login')).toBe(null);
    expect(await screen.findByTestId('main-page')).toBeInTheDocument();
  });
});
