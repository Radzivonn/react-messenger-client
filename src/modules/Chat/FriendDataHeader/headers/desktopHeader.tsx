import React, { ComponentProps, FC } from 'react';
import { AvatarPlaceholder } from '../../../../components/UI/AvatarPlaceholder/AvatarPlaceholder';

interface Props extends ComponentProps<'section'> {
  receiverName: string;
  isOnline: boolean;
}

export const DesktopHeader: FC<Props> = ({ receiverName, isOnline }) => {
  return (
    <section className="friend-header">
      <div className="mr-6 flex gap-5">
        <AvatarPlaceholder name={receiverName} isOnline={isOnline} />
        <div className="flex flex-col gap-2">
          <h2 className="name"> {receiverName} </h2>
          <p className="online-status"> {isOnline ? 'Online' : 'Offline'} </p>
        </div>
      </div>
    </section>
  );
};
