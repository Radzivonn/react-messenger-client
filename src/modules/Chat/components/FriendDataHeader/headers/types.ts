import { ComponentProps } from 'react';

export interface Props extends ComponentProps<'section'> {
  receiverId: string;
  receiverName: string;
  isOnline: boolean;
}

export interface ChildrenProps {
  children: React.ReactNode;
}
