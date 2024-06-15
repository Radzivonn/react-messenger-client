import React, { type FC, useState } from 'react';
import { ReceiverContext } from './receiverContext';

export const ReceiverProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReceiverOnline, setIsReceiverOnline] = useState<boolean>(false);

  return (
    <ReceiverContext.Provider value={{ isReceiverOnline, setIsReceiverOnline }}>
      {children}
    </ReceiverContext.Provider>
  );
};
