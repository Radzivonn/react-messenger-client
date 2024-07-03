import React, { ComponentProps, FC } from 'react';
import { OnlineStatusMarker } from '../OnlineStatusMarker/OnlineStatusMarker';

interface Props extends ComponentProps<'div'> {
  name: string;
  isOnline: boolean;
}

export const AvatarPlaceholder: FC<Props> = ({ name, isOnline }) => {
  return (
    <div className="avatar-placeholder">
      <p className="absolute text-2xl capitalize">{name.slice(0, 1)}</p>
      {isOnline && <OnlineStatusMarker />}
    </div>
  );
};
