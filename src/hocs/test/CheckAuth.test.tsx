import { screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { RenderWithRouter } from 'tests/helpers/RenderWithRouter';
import authService from 'API/services/AuthService/AuthService';

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

  it('Check user authorized route', async () => {
    authService.saveAccessToken('mock-token');

    RenderWithRouter(queryClient, null, `/`);

    expect(screen.queryByTestId('login')).toBe(null);
    expect(await screen.findByTestId('main-page')).toBeInTheDocument();
  });
});
