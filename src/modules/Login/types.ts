import { UseMutateFunction } from '@tanstack/react-query';
import { AuthResponse } from 'API/services/AuthService/models';

type LoginPayload = {
  email: string;
  password: string;
};

export type LoginMutationFunction = UseMutateFunction<AuthResponse, Error, LoginPayload, unknown>;
