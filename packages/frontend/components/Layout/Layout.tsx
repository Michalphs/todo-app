import React from 'react';
import s from './Layout.module.css';

const Layout: React.FC = ({ children }) => {
  return (
    <div className={s.root}>
      <div>navbar</div>
      <div className={s.body}>{children}</div>
      <div>footer</div>
    </div>
  );
};

export default Layout;
