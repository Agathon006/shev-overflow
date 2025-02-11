import { useMutation } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { authUserQueryOptions } from '@/api/auth';
import { queryClient } from '@/App';
import { MutationConfigType } from '@/lib/react-query';

import { LoginSchema } from '../schemas/login';
import { loginResponseSchema } from '../schemas/loginResponse';

type UseLoginOptionsType = {
  mutationConfig?: MutationConfigType<typeof loginUser>;
};

export const loginUser = async (credentials: LoginSchema) => {
  const response = await api.post('/auth/login', credentials);
  return loginResponseSchema.parseAsync(response.data);
};

export const useLogin = ({ mutationConfig }: UseLoginOptionsType = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: authUserQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
