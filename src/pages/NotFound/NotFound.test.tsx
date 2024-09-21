import { act } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient } from '@tanstack/react-query';
import { RenderWithRouter } from 'tests/helpers/RenderWithRouter';

const queryClient = new QueryClient();

describe('Not found page tests', () => {
  describe('Checks with incorrect routes', () => {
    it('Check /qwerty route', async () => {
      RenderWithRouter(queryClient, null, `/qwerty`);

      expect(await screen.findByTestId('not-found-page')).toBeInTheDocument();
    });

    it('Check /users/mock-id', async () => {
      RenderWithRouter(queryClient, null, `/users/mock-id`);

      expect(await screen.findByTestId('not-found-page')).toBeInTheDocument();
    });

    it('Check /users//mock-name', async () => {
      RenderWithRouter(queryClient, null, `/users//mock-name`);

      expect(await screen.findByTestId('not-found-page')).toBeInTheDocument();
    });
  });

  it('Check return link', async () => {
    RenderWithRouter(queryClient, null, `/loginn`);

    expect(await screen.findByTestId('not-found-page')).toBeInTheDocument();
    expect(screen.getByText('404 Error')).toBeInTheDocument();

    const returnLink = screen.getByTestId('return-link');
    await act(async () => {
      await userEvent.click(returnLink);
    });

    expect(await screen.findByTestId('login')).toBeInTheDocument();
  });
});
