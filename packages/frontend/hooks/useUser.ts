import { useMutation, useQuery } from 'react-query';
import { auth, users } from 'api';
import { AxiosError, AxiosResponse } from 'axios';
import { User } from 'types';
import { useEffect } from 'react';

const useUser = () => {
  const {
    data,
    isLoading: isUserLoading,
    error: userError,
    refetch: userRefetch,
  } = useQuery<AxiosResponse<User>, AxiosError>('me', users.me, { retry: false });

  const { mutate: logout, isSuccess: isLogoutSuccess, error: logoutError, isLoading: isLogoutLoading } = useMutation(auth.logout);

  useEffect(() => {
    if (isLogoutSuccess) {
      userRefetch();
    }
  }, [isLogoutSuccess, userRefetch]);

  return {
    user: data?.data,
    isAuthenticated: Boolean(data?.data && !isUserLoading && !userError),
    isUserLoading,
    userError,
    logout,
    logoutError,
    isLogoutLoading,
    isLogoutSuccess,
  };
};

export default useUser;
