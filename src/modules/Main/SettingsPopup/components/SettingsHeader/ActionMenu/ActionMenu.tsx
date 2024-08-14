import React, { ComponentProps, FC, forwardRef } from 'react';
import { LogoutButton } from './LogoutButton';
import { RemoveAccountButton } from './RemoveAccountButton';

export const ActionMenu: FC<ComponentProps<'div'>> = forwardRef(({ ...props }, ref) => {
  return (
    <div className="action-menu" {...props} ref={ref}>
      <LogoutButton className="action-menu__button">
        <p> Log out</p>
      </LogoutButton>
      <RemoveAccountButton className="action-menu__button">
        <p>Remove account</p>
      </RemoveAccountButton>
    </div>
  );
});
