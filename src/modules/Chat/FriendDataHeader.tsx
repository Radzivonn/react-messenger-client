import React, { ComponentProps, FC, useContext } from 'react';
import { ReceiverContext } from '../../store/receiverData/receiverContext';

interface Props extends ComponentProps<'section'> {
  receiverName: string;
}

export const FriendDataHeader: FC<Props> = ({ receiverName }) => {
  const { isReceiverOnline } = useContext(ReceiverContext);

  return (
    <section className="friend-header">
      <div className="flex flex-col gap-2">
        <h2 className="name"> {receiverName} </h2>
        <p className="online-status"> {isReceiverOnline ? 'Online' : 'Offline'} </p>
      </div>
      <div className="avatar-placeholder">{receiverName?.slice(0, 1)}</div>
    </section>
  );
};
