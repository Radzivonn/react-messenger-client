import { FC } from 'react';
import { TailSpin, TailSpinProps } from 'react-loader-spinner';

export const TailSpinner: FC<TailSpinProps> = (props) => {
  return (
    <TailSpin
      height="80"
      width="80"
      color="var(--accent-color-1-default)"
      radius="1"
      wrapperStyle={{ margin: 'auto' }}
      visible={true}
      {...props}
    />
  );
};
