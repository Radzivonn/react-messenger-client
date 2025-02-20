import { ComponentProps, FC, useState } from 'react';
import { OnlineStatusMarker } from '../OnlineStatusMarker/OnlineStatusMarker';
import { AvatarPlaceholder } from './AvatarPlaceholder';
import { useAvatarImage } from 'hooks/useAvatarImage/useAvatarImage';
import { OpenedImage } from './OpenedImage/OpenedImage';

const VITE_SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

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
  const [isImageOpened, setIsImageOpened] = useState(false);
  const { data } = useAvatarImage(userId);
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
      <div className={`avatar${isOpenable ? '--clickable' : ''} ${className ?? ''}`}>
        <img
          className="avatar-image"
          src={`${VITE_SERVER_API_URL}${data.avatarPath}`}
          alt="avatar"
          onClick={() => setIsImageOpened(true)}
        />
        {isOnline && <OnlineStatusMarker />}
        {children}
      </div>
      {isImageShow && (
        <OpenedImage
          imagePath={`${VITE_SERVER_API_URL}${data.avatarPath}`}
          onImageClose={() => setIsImageOpened(false)}
        />
      )}
    </>
  );
};
