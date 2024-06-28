import './style.scss';
import React, { useState, forwardRef } from 'react';
import { type ITextFieldProps } from './types';
import useInputIcon from '../../../hooks/useInputIcon/useInputIcon';

export const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
  (
    {
      id,
      type = 'text',
      label,
      isValid = true,
      helpText,
      className,
      onChange,
      ...props
    }: ITextFieldProps,
    ref,
  ) => {
    const [isActiveOption, setIsActiveOption] = useState(false);
    const [fieldIcon, isInteractive, inputType] = useInputIcon(type, isActiveOption);

    return (
      <div className={`${className ?? ''} text-field ${isValid ? '' : 'text-field--invalid'}`}>
        <div className="text-field__container">
          <input
            ref={ref}
            onChange={onChange}
            className="text-field__input"
            placeholder=""
            type={inputType}
            autoComplete="on"
            {...props}
          />
          {label ? (
            <>
              <label className="text-field__label" htmlFor={id}>
                {label}
              </label>
              <fieldset className="text-field__fieldset">
                <legend className="text-field__legend">
                  <span>{label}</span>
                </legend>
              </fieldset>
            </>
          ) : (
            <fieldset className="text-field__fieldset">
              <legend className="text-field__legend"></legend>
            </fieldset>
          )}
          <div
            className="text-field__icon-container"
            style={{ pointerEvents: isInteractive ? 'auto' : 'none' }}
            onClick={() => {
              setIsActiveOption(!isActiveOption);
            }}
          >
            {fieldIcon}
          </div>
        </div>
        <p className="text-field__text-helper">{helpText ?? ''}</p>
      </div>
    );
  },
);
