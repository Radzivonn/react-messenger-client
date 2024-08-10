import React, { ComponentProps, FC } from 'react';
import { OnlineStatusMarker } from '../OnlineStatusMarker/OnlineStatusMarker';
import { AvatarPlaceholder } from './AvatarPlaceholder';
import { useAvatarImage } from '../../../hooks/useAvatarImage/useAvatarImage';

interface Props extends ComponentProps<'div'> {
  userId: string;
  name: string;
  isOnline: boolean;
}

export const AvatarImage: FC<Props> = ({ className, userId, name, isOnline, children }) => {
  const { data } = useAvatarImage(userId);

  if (!data) {
    return (
      <AvatarPlaceholder className={className} name={name} isOnline={isOnline}>
        {children}
      </AvatarPlaceholder>
    );
  }

  return (
    <div className={`avatar ${className ?? ''}`}>
      <img className="avatar-image" src={'http://localhost:5050/' + data.avatarPath} alt="avatar" />
      {isOnline && <OnlineStatusMarker />}
      {children}
    </div>
  );
};