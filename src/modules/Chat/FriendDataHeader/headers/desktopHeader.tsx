import React, { FC } from 'react';
import { ChildrenProps } from './types';

export const DesktopHeader: FC<ChildrenProps> = ({ children }) => {
  return <section className="friend-header friend-header--desktop">{children}</section>;
};
