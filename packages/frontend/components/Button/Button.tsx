import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import s from './Button.module.css';

type ButtonProps = {
  onClick?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  fullSize?: boolean;
  className?: string;
  href?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  type = 'button',
  size = 'md',
  fullSize = false,
  className,
  href,
  children,
}) => {
  const classes = clsx(s.btn, s[`btn-${size}`], fullSize && s.fullSize, className);

  if (href) {
    return (
      <Link href={href}>
        <a className={classes}>{children}</a>
      </Link>
    );
  }

  return (
    <button
      /* eslint-disable-next-line react/button-has-type */
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
