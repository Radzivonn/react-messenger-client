import React, { FC } from 'react';
import { ThreeDots, ThreeDotsProps } from 'react-loader-spinner';

export const ThreeDotsLoader: FC<ThreeDotsProps> = (props) => {
  return (
    <ThreeDots
      height="20"
      width="30"
      color="var(--accent-color-1-default)"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ margin: 'auto' }}
      visible={true}
      {...props}
    />
  );
};
