import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import authService from 'API/services/AuthService/AuthService';
import { AuthResponse } from 'API/services/AuthService/models';

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<AuthResponse, Error, { userName: string; email: string; password: string }>({
    mutationKey: ['registration'],
    mutationFn: ({ userName, email, password }) => authService.register(userName, email, password),
    onSuccess: (userData) => {
      authService.saveAccessToken(userData.accessToken);
      void queryClient.invalidateQueries({ queryKey: ['userData'] });
      toast.success('You are successfully registered!');
      navigate(`/users/${userData.user.id}/${userData.user.name}`, { replace: true });
    },
    onError: () => {
      toast.error('This user was not found');
    },
    retry: false,
  });
};
