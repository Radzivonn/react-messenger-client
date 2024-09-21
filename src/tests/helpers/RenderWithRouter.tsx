import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from 'router/AppRouter';

/* Render result with app router for tests */
export const RenderWithRouter = (
  queryClient: QueryClient,
  component: ReactNode,
  initialRoute = '/',
) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        {component}
      </QueryClientProvider>
    </MemoryRouter>,
  );
};
