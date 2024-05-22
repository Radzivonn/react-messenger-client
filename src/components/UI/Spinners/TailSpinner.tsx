import React, { FC } from 'react';
import { TailSpin, TailSpinProps } from 'react-loader-spinner';

export const TailSpinner: FC<TailSpinProps> = (props) => {
  return (
    <TailSpin
      height="80"
      width="80"
      color="#feffb5"
      radius="1"
      wrapperStyle={{ margin: 'auto' }}
      visible={true}
      {...props}
    />
  );
};
