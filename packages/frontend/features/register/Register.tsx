import React from 'react';
import Link from 'next/link';
import Layout from 'components/Layout/Layout';
import RegisterForm from './components/RegisterForm/RegisterForm';
import s from './Register.module.css';

const Register = () => {
  return (
    <Layout>
      <div className={s.root}>
        <h1 className={s.title}>Create an Account</h1>
        <div className={s.login}>
          You have already account?{' '}
          <Link href={'/login'}>
            <a className={s.loginText}>Sign in</a>
          </Link>
        </div>
        <div className={s.form}>
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
