import React, { ComponentProps, FC } from 'react';
import { Tab } from './BaseTab/Tab';

interface Props extends ComponentProps<'div'> {
  name: string;
}

export const FriendTab: FC<Props> = ({ name }) => {
  return (
    <Tab>
      <div className="tab__info_avatar-placeholder">{name.slice(0, 1)}</div>
      <h3 className="tab__info_name">{name}</h3>
    </Tab>
  );
};
