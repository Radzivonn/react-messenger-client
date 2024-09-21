import { act } from 'react';
import { render, screen } from '@testing-library/react';
import { useDebounce } from './useDebounce';

const DebounceTestComponent = ({ value, delay }: { value: string; delay?: number }) => {
  const debouncedValue = useDebounce(value, delay);
  return <div data-testid="debounced-value">{debouncedValue}</div>;
};

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should return the debounced value after the specified delay', () => {
    const { rerender } = render(<DebounceTestComponent value="Initial" />);

    expect(screen.getByTestId('debounced-value')).toHaveTextContent('Initial');

    rerender(<DebounceTestComponent value="Updated" />);

    expect(screen.getByTestId('debounced-value')).toHaveTextContent('Initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByTestId('debounced-value')).toHaveTextContent('Updated');
  });

  it('should allow to set a custom delay', () => {
    const { rerender } = render(<DebounceTestComponent value="Initial" delay={1000} />);

    expect(screen.getByTestId('debounced-value')).toHaveTextContent('Initial');

    rerender(<DebounceTestComponent value="Updated" delay={1000} />);

    expect(screen.getByTestId('debounced-value')).toHaveTextContent('Initial');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId('debounced-value')).toHaveTextContent('Updated');
  });
});
