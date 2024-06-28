import './style.scss';
import React, { type FC, type ComponentProps } from 'react';
import CheckIcon from './assets/check-icon.svg?react';

interface IControlLabelProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  label: string;
  onChange: (value: boolean) => void;
}

export const ControlLabel: FC<IControlLabelProps> = ({ className, label, onChange, ...props }) => {
  return (
    <label className={`${className ?? ''} checkbox-field`}>
      <input
        {...props}
        className="checkbox-field__input"
        type="checkbox"
        onChange={(evt) => {
          onChange(evt.target.checked);
        }}
      />
      <span className="checkbox-field__checker">
        <CheckIcon className="icon" />
      </span>
      <span className="checkbox-field__label">{label}</span>
    </label>
  );
};
