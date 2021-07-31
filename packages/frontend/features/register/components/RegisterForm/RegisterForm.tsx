import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import FormControl from 'components/FormControl/FormControl';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { CredentialsRegister } from 'types';
import FormError from 'components/FormError/FormError';
import { useRegister, useLogin } from 'hooks';

const RegisterSchema = z.object({
  name: z.string().min(3).nonempty(),
  email: z.string().email(),
  password: z.string().min(3).max(64),
});

const RegisterForm = () => {
  const [credentials, setCredentials] = useState<CredentialsRegister>();
  const router = useRouter();
  const { registerUser, isLoading, isSuccess: isRegisterSuccess, error } = useRegister();
  const { loginUser, isSuccess: isLoginSuccess } = useLogin();

  const apiError = error?.response;
  const isConflictStatus = apiError?.status === 409;
  const errorMsg = !isConflictStatus ? apiError?.data?.message : null;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  useEffect(() => {
    if (isConflictStatus && apiError?.data?.error === 'Conflict') {
      setError('email', { message: apiError?.data?.message });
    }
  }, [isConflictStatus, setError, apiError]);

  useEffect(() => {
    if (isRegisterSuccess && credentials) {
      loginUser(credentials);
    }
  }, [credentials, isRegisterSuccess, loginUser, router]);

  useEffect(() => {
    if (isLoginSuccess) {
      router.push('/');
    }
  }, [isLoginSuccess, router]);

  const onSubmit = (data: CredentialsRegister) => {
    setCredentials(data);
    registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormError errorMessage={errorMsg} />
      </FormControl>
      <FormControl>
        <Input register={register('name')} label="Your name" placeholder="Name" error={errors?.name?.message} />
      </FormControl>
      <FormControl>
        <Input register={register('email')} label="Email" placeholder="Email" error={errors?.email?.message} />
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
      <Button type="submit" disabled={isLoading} fullSize className="mt-2.5">
        Register account
      </Button>
    </form>
  );
};

export default RegisterForm;
