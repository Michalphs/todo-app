import React from 'react';
import clsx from 'clsx';
import s from './Button.module.css';

type ButtonProps = {
  onClick?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  fullSize?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  type = 'button',
  size = 'md',
  fullSize = false,
  className,
  children,
}) => (
  <button
    /* eslint-disable-next-line react/button-has-type */
    type={type}
    disabled={disabled}
    className={clsx(s.btn, s[`btn-${size}`], fullSize && s.fullSize, className)}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
