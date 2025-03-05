import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import authService from 'API/services/AuthService/AuthService';
import { User } from 'types/types';
import { HTTPError } from 'ky';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<User, Error, { email: string; password: string }>({
    mutationKey: ['login'],
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (userData) => {
      void queryClient.invalidateQueries({ queryKey: ['userData'] });
      toast.success('You are successfully logged in!');
      navigate(`/users/${userData.id}/${userData.name}`, { replace: true });
    },
    onError: async (error) => {
      if (error instanceof HTTPError && error.response) {
        const errorData = await error.response.json();
        toast.error(errorData.message);
      } else {
        toast.error('Something went wrong!');
      }
    },
    retry: false,
  });
};
