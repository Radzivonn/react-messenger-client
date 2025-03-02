import { ComponentProps, FC, forwardRef } from 'react';
import { LogoutButton } from './LogoutButton';
import { RemoveAccountButton } from './RemoveAccountButton';

// TODO remove forwardRef in react 19.0
export const ActionMenu: FC<ComponentProps<'div'>> = forwardRef(({ ...props }, ref) => {
  return (
    <div className="action-menu" {...props} ref={ref} data-testid="action-menu">
      <LogoutButton className="action-menu__button">
        <p> Log out</p>
      </LogoutButton>
      <RemoveAccountButton className="action-menu__button">
        <p>Remove account</p>
      </RemoveAccountButton>
    </div>
  );
});
