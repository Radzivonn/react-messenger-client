import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChangeAvatarButton } from 'components/UI/AvatarUI/ChangeAvatarButton';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import userService from 'API/services/UserService/UserService';

const queryClient = new QueryClient();

describe('Change avatar button component test', () => {
  it('check render)', async () => {
    const user = userEvent.setup();

    const spy = vi.spyOn(userService, 'updateAvatarImage');
    spy.mockImplementationOnce(() => Promise.resolve(undefined));

    render(
      <QueryClientProvider client={queryClient}>
        <ChangeAvatarButton userId="mock-id" />
      </QueryClientProvider>,
    );

    const fileUploader = screen.getByLabelText('file-uploader');
    expect(fileUploader).toBeInTheDocument();

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    await user.upload(fileUploader, file);

    expect(spy).toHaveBeenCalled();
  });
});
