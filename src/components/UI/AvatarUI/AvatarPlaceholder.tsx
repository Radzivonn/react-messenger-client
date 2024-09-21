import { ComponentProps, FC } from 'react';
import { OnlineStatusMarker } from '../OnlineStatusMarker/OnlineStatusMarker';

interface Props extends ComponentProps<'div'> {
  name: string;
  isOnline: boolean;
}

export const AvatarPlaceholder: FC<Props> = ({ className, name, isOnline, children }) => {
  return (
    <div className={`avatar ${className ?? ''}`}>
      <p className="absolute capitalize">{name.slice(0, 1)}</p>
      {isOnline && <OnlineStatusMarker />}
      {children}
    </div>
  );
};
