import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { LinkToSearching } from './LinkToSearching';
import userEvent from '@testing-library/user-event';
import { mainPageRoutes } from 'router/routes';
import { act } from 'react';

const Main = () => {
  return <div data-testid="Main" />;
};

const Search = () => {
  return <div data-testid="Search" />;
};

describe('Link to searching tab tests', () => {
  it('Link test', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <LinkToSearching />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path={`/${mainPageRoutes.searching}`} element={<Search />} />
        </Routes>
      </MemoryRouter>,
    );

    const link = screen.getByTestId('link-to-searching');
    expect(link).toBeInTheDocument();
    expect(screen.getByTestId('Main')).toBeInTheDocument();
    expect(screen.queryByTestId('Search')).toBe(null);

    await act(async () => {
      await userEvent.click(link);
    });

    expect(screen.getByTestId('Search')).toBeInTheDocument();
    expect(screen.queryByTestId('Main')).toBe(null);
  });
});
