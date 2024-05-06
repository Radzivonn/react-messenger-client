import './style.scss';
import React, { type FC, type ComponentProps } from 'react';

export const Form: FC<ComponentProps<'form'>> = ({ className, ...props }) => {
  return <form {...props} className={`${className ?? ''} form`}></form>;
};
