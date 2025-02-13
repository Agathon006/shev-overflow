import { useMutation } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { authUserQueryOptions } from '@/api/auth';
import { queryClient } from '@/lib/react-query';
import { MutationConfigType } from '@/lib/react-query';
import { userSchema } from '@/schemas/user';

import { LoginSchema } from '../schemas/login';

type UseLoginOptionsType = {
  mutationConfig?: MutationConfigType<typeof loginUser>;
};

export const loginUser = async (credentials: LoginSchema) => {
  const response = await api.post('/auth/login', credentials);
  
  return userSchema.parseAsync(response.data);
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
