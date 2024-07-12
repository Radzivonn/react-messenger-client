import { ComponentProps } from 'react';

export interface Props extends ComponentProps<'section'> {
  receiverName: string;
  isOnline: boolean;
}

export interface ChildrenProps {
  children: React.ReactNode;
}
