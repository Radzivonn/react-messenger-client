import React, { ComponentProps, FC } from 'react';
import './style.scss';

export const Tab: FC<ComponentProps<'section'>> = ({ children }) => {
  return (
    <section className="tab">
      <div className="tab__info">{children}</div>
    </section>
  );
};
