import { render, screen } from '@testing-library/react';
import { DesktopHeader } from '../desktopHeader';

describe('Desktop header tests', () => {
  it('Check render with children', async () => {
    render(
      <DesktopHeader>
        <div data-testid={'mock-user-info'} />
      </DesktopHeader>,
    );

    expect(screen.getByTestId('mock-user-info'));
  });
});
