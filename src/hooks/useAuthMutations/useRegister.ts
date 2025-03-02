import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import authService from 'API/services/AuthService/AuthService';
import { User } from 'types/types';

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<User, Error, { userName: string; email: string; password: string }>({
    mutationKey: ['registration'],
    mutationFn: ({ userName, email, password }) => authService.register(userName, email, password),
    onSuccess: (userData) => {
      void queryClient.invalidateQueries({ queryKey: ['userData'] });
      toast.success('You are successfully registered!');
      navigate(`/users/${userData.id}/${userData.name}`, { replace: true });
    },
    onError: () => {
      toast.error('This user was not found');
    },
    retry: false,
  });
};
