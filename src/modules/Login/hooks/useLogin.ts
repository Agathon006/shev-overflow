import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/types/react-query';

import { LoginSchema } from '../schemas/login';
import { loginResponseSchema } from '../schemas/loginResponse';

export const loginUser = async (credentials: LoginSchema) => {
  const response = await api.post('/auth/login', credentials);
  return loginResponseSchema.parseAsync(response.data);
};

type UseLoginOptionsType = {
  mutationConfig?: MutationConfigType<typeof loginUser>;
};

export const useLogin = ({ mutationConfig }: UseLoginOptionsType = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
