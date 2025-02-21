import { UseMutateFunction } from '@tanstack/react-query';
import { AuthResponse } from 'API/services/AuthService/models';

type RegistrationPayload = {
  userName: string;
  email: string;
  password: string;
};

export type RegistrationMutationFunction = UseMutateFunction<
  AuthResponse,
  Error,
  RegistrationPayload,
  unknown
>;
