import React from 'react';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import s from './Input.module.css';

type InputProps = {
  register: UseFormRegisterReturn;
  label: string;
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
};

const Input = ({
  label,
  type,
  placeholder,
  error,
  disabled,
  register,
  autoComplete,
  ...rest
}: InputProps) => {
  const { ref, name, onBlur, onChange } = register;

  return (
    <div>
      <label htmlFor={name} className={clsx(s.label, error && s.labelError)}>
        {label}
        <div className={s.formControl}>
          <input
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            className={clsx(s.input, error && s.inputError)}
            ref={ref}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
            {...rest}
          />
        </div>
      </label>

      {error && (
        <div role="alert" className={s.error}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
