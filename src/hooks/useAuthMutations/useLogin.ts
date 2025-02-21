import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import authService from 'API/services/AuthService/AuthService';
import { AuthResponse } from 'API/services/AuthService/models';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationKey: ['login'],
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (userData) => {
      authService.saveAccessToken(userData.accessToken);
      void queryClient.invalidateQueries({ queryKey: ['userData'] });
      toast.success('You are successfully logged in!');
      navigate(`/users/${userData.user.id}/${userData.user.name}`, { replace: true });
    },
    onError: () => {
      toast.error('This user was not found');
    },
    retry: false,
  });
};
