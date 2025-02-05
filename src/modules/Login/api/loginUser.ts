import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';

import {
  loginResponseSchema,
  LoginResponseType,
} from '../schemas/loginResponseSchema';
import { LoginFormInputsType } from '../schemas/loginSchema';

type UseLoginOptions = {
  mutationConfig?: {
    onSuccess?: (data: LoginResponseType) => void;
  };
};

export const loginUser = async (credentials: LoginFormInputsType) => {
  const response = await api.post('/auth/login', credentials);

  return loginResponseSchema.parseAsync(response.data);
};

export const useLogin = ({ mutationConfig }: UseLoginOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      onSuccess?.(data);
    },
    ...restConfig,
  });
};
