import './style.scss';
import { type FC, type ComponentProps } from 'react';

export interface IButtonProps extends ComponentProps<'button'> {
  accent?: boolean;
  rounded?: boolean;
}

export const Button: FC<IButtonProps> = ({
  accent,
  rounded,
  className,
  type = 'button',
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={`button ${accent ? 'button--accent' : ''} ${rounded ? 'button--rounded' : ''} ${className ?? ''}`}
    ></button>
  );
};
