import React from 'react';
import clsx from 'clsx';
import s from './Button.module.css';

type ButtonProps = {
  onClick?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  type = 'button',
  size = 'md',
  className,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(s.btn, s[`btn-${size}`], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
