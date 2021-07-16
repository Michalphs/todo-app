import React, { useEffect } from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormControl from 'components/FormControl/FormControl';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import s from './LoginForm.module.css';
import { useMutation } from 'react-query';
import { auth } from 'api';
import { LoginData } from 'types';
import { useRouter } from 'next/router';

//TODO: ADD reset password

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(64),
});

const LoginForm = () => {
  const router = useRouter();
  const { mutate: loginUser, isLoading, isSuccess } = useMutation(auth.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess, router]);

  const onSubmit = (data: LoginData) => {
    loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Input
          register={register('email')}
          label="Email"
          placeholder="Email"
          error={errors?.email?.message}
        />
      </FormControl>
      <FormControl>
        <Input
          register={register('password')}
          label="Password"
          placeholder="Password"
          type="password"
          error={errors?.password?.message}
        />
      </FormControl>
      <FormControl>
        <div className={s.forgot}>
          <Link href={'/'}>
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
