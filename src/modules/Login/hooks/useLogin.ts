import { useMutation } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { queryClient } from '@/App';
import { authUserQueryOptions } from '@/hooks/useAuth';
import { MutationConfigType } from '@/types/react-query';

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
