import { render, screen } from '@testing-library/react';
import { MessagesList } from '../MessagesList';
import { mockMessages } from 'mocks/mocks';

describe('Messages list component tests', () => {
  it('Check with no messages', () => {
    render(<MessagesList userName="mock-name" messages={[]} />);

    expect(screen.getByText('No messages here yet'));
  });

  it('Check with messages', async () => {
    HTMLElement.prototype.scrollIntoView = vi.fn();

    render(<MessagesList userName="mock-name" messages={mockMessages} />);

    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'instant',
    });

    mockMessages.forEach((message) => {
      expect(screen.getByText(message.message));
      expect(screen.getByText(message.date));
    });

    expect(screen.queryByText('No messages here yet')).toBe(null);
  });
});
