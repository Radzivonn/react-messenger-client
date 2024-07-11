import React, { ComponentProps, FC } from 'react';
import './style.scss';

export const Tab: FC<ComponentProps<'section'>> = ({ children, className, ...props }) => {
  return (
    <section className={`tab ${className ?? ''}`} {...props}>
      <div className="tab__info">{children}</div>
    </section>
  );
};
