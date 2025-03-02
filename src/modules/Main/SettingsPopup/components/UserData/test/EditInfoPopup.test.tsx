import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EditInfoPopup } from '../EditInfoPopup';
import userService from 'API/services/UserService/UserService';
import userEvent from '@testing-library/user-event';
import { mockUser } from 'mocks/mocks';

const queryClient = new QueryClient();

describe('Edit info popup tests', () => {
  it('Check render and button handlers', async () => {
    const mockOnCancelCallback = vi.fn();
    const spyUpdateUserName = vi
      .spyOn(userService, 'updateUserName')
      .mockReturnValue(Promise.resolve(mockUser));

    render(
      <QueryClientProvider client={queryClient}>
        <EditInfoPopup
          userId="mock-id"
          currentInfo="John"
          editingOption="Name"
          onCancelCallback={mockOnCancelCallback}
        />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('editing-popup')).toBeInTheDocument();
    expect(screen.getByText('Edit your Name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(mockOnCancelCallback).toHaveBeenCalled();

    await userEvent.click(saveButton);

    expect(spyUpdateUserName).toHaveBeenCalled();
  });
});
