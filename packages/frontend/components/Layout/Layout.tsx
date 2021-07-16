import React from 'react';
import s from './Layout.module.css';
import Navbar from '../Navbar/Navbar';

const Layout: React.FC = ({ children }) => (
  <div className={s.root}>
    <Navbar />
    <div className={s.body}>{children}</div>
    <div>footer</div>
  </div>
);

export default Layout;
