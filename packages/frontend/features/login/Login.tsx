import React from 'react';
import Link from 'next/link';
import Layout from 'components/Layout/Layout';
import LoginForm from './components/LoginForm';
import s from './Login.module.css';

const Login = () => {
  return (
    <Layout>
      <div className={s.root}>
        <h1 className={s.title}>Sign in to your account</h1>
        <div className={s.register}>
          Or{' '}
          <Link href={'/register'}>
            <a className={s.registerText}>register new account</a>
          </Link>
        </div>
        <div className={s.form}>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
