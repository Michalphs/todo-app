import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { CredentialsRegister } from 'types';
import { auth } from 'api';

const useRegister = () => {
  const { mutate, isLoading, isSuccess, error } = useMutation<AxiosResponse, AxiosError, CredentialsRegister>(auth.register);

  return {
    registerUser: mutate,
    isSuccess,
    error,
    isLoading,
  };
};

export default useRegister;
