import React, { ComponentProps, FC, useState } from 'react';
import { OnlineStatusMarker } from '../OnlineStatusMarker/OnlineStatusMarker';
import { AvatarPlaceholder } from './AvatarPlaceholder';
import { useAvatarImage } from '../../../hooks/useAvatarImage/useAvatarImage';
import { OpenedImage } from './OpenedImage/OpenedImage';

interface Props extends ComponentProps<'div'> {
  userId: string;
  name: string;
  isOnline: boolean;
  isOpenable: boolean;
}

export const AvatarImage: FC<Props> = ({
  className,
  userId,
  name,
  isOnline,
  isOpenable,
  children,
}) => {
  const { data } = useAvatarImage(userId);
  const [isImageOpened, setIsImageOpened] = useState(false);
  const isImageShow = isImageOpened && isOpenable;

  if (!data) {
    return (
      <AvatarPlaceholder className={className} name={name} isOnline={isOnline}>
        {children}
      </AvatarPlaceholder>
    );
  }

  return (
    <>
      <div className={`avatar ${className ?? ''}`} onClick={() => setIsImageOpened(true)}>
        <img
          className="avatar-image"
          src={'http://localhost:5050/' + data.avatarPath}
          alt="avatar"
        />
        {isOnline && <OnlineStatusMarker />}
        {children}
      </div>
      {isImageShow && (
        <OpenedImage
          imagePath={'http://localhost:5050/' + data.avatarPath}
          onImageClose={() => setIsImageOpened(false)}
        />
      )}
    </>
  );
};
