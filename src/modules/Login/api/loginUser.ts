import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/types/react-query';

import { loginResponseSchema } from '../schemas/loginResponseSchema';
import { LoginFormInputsType } from '../schemas/loginSchema';

export const loginUser = async (credentials: LoginFormInputsType) => {
  const response = await api.post('/auth/login', credentials);
  return loginResponseSchema.parseAsync(response.data);
};

type UseLoginOptionsType = {
  mutationConfig?: MutationConfigType<typeof loginUser>;
};

export const useLogin = ({ mutationConfig }: UseLoginOptionsType = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      mutationConfig?.onSuccess?.(data, variables, context);
    },
    ...mutationConfig,
  });
};
