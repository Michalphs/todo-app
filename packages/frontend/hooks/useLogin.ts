import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Credentials } from 'types';
import { auth } from 'api';

const useLogin = () => {
  const { mutate, isLoading, isSuccess, error } = useMutation<AxiosResponse, AxiosError, Credentials>(auth.login);

  return {
    loginUser: mutate,
    isLoading,
    isSuccess,
    error,
  };
};

export default useLogin;
