import { createContext } from 'react';

export const ReceiverContext = createContext<{
  isReceiverOnline?: boolean;
  setIsReceiverOnline?: React.Dispatch<React.SetStateAction<boolean>>;
}>({});
