import React from 'react';
import clsx from 'clsx';
import s from './FormControl.module.css';

type FormControlProps = {
  className?: string;
};

const FormControl: React.FC<FormControlProps> = ({ className, children }) => {
  return <div className={clsx(s.root, className)}>{children}</div>;
};

export default FormControl;
