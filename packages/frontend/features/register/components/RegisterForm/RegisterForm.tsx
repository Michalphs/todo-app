import React from 'react';
import { z } from 'zod';
import FormControl from 'components/FormControl/FormControl';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const RegisterSchema = z.object({
  name: z.string().min(3).nonempty(),
  email: z.string().email(),
  password: z.string().min(3).max(64),
});

type FormData = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Input
          register={register('name')}
          label="Your name"
          placeholder="Name"
          error={errors?.name?.message}
        />
      </FormControl>
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
      <Button type="submit" fullSize className="mt-2.5">
        Register account
      </Button>
    </form>
  );
};

export default RegisterForm;
