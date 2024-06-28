import React, { ComponentProps, FC } from 'react';
import './style.scss';

export const Tab: FC<ComponentProps<'section'>> = ({ children, ...props }) => {
  return (
    <section className="tab" {...props}>
      <div className="tab__info">{children}</div>
    </section>
  );
};
