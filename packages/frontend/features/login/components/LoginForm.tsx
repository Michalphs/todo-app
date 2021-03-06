import React, { useEffect } from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormControl from 'components/FormControl/FormControl';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { Credentials } from 'types';
import { useRouter } from 'next/router';
import FormError from 'components/FormError/FormError';
import { useLogin } from 'hooks';
import s from './LoginForm.module.css';

// TODO: ADD reset password

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(64),
});

const LoginForm = () => {
  const router = useRouter();
  const { loginUser, isLoading, isSuccess, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const errorMsg = error?.response?.data?.message;

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (errorMsg) {
      setError('email', { message: ' ' });
      setError('password', { message: ' ' });
    }
  }, [errorMsg, setError]);

  const onSubmit = (data: Credentials) => {
    loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormError errorMessage={errorMsg} />
      </FormControl>
      <FormControl>
        <Input register={register('email')} label="Email" placeholder="Email" error={errors?.email?.message} autoComplete="off" />
      </FormControl>
      <FormControl>
        <Input
          register={register('password')}
          label="Password"
          placeholder="Password"
          type="password"
          autoComplete="off"
          error={errors?.password?.message}
        />
      </FormControl>
      <FormControl>
        <div className={s.forgot}>
          <Link href="/">
            <a className={s.forgotText}>Forgot your password?</a>
          </Link>
        </div>
      </FormControl>
      <Button type="submit" disabled={isLoading} fullSize>
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
