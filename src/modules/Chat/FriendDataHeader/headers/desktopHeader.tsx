import React, { ComponentProps, FC } from 'react';
import { useReceiverStore } from '../../../../store/receiver/receiverStore';

interface Props extends ComponentProps<'section'> {
  receiverName: string;
}

export const DesktopHeader: FC<Props> = ({ receiverName }) => {
  const isReceiverOnline = useReceiverStore((state) => state.isReceiverOnline);

  return (
    <section className="friend-header">
      <div className="mr-6 flex gap-5">
        <div className="avatar-placeholder">{receiverName?.slice(0, 1)}</div>
        <div className="flex flex-col gap-2">
          <h2 className="name"> {receiverName} </h2>
          <p className="online-status"> {isReceiverOnline ? 'Online' : 'Offline'} </p>
        </div>
      </div>
    </section>
  );
};
