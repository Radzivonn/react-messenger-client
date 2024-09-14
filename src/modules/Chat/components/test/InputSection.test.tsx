import { render, screen } from '@testing-library/react';
import { InputSection } from '../InputSection';

describe('Message sending input component tests', () => {
  it('Check typing text', () => {
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();

    render(<InputSection />);

    expect(screen.getByText('No messages here yet'));
  });
});
