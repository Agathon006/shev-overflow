import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';

import { LoginFormInputsType } from '../schemas/loginSchema';
import {
  SuccessResponseSchema,
  SuccessResponseType,
} from '../schemas/successResponseSchema';

type UseLoginOptions = {
  mutationConfig?: {
    onSuccess?: (data: SuccessResponseType) => void;
  };
};

export const loginUser = async (credentials: LoginFormInputsType) => {
  const response = await api.post('/auth/login', credentials);

  const validatedData = await SuccessResponseSchema.parseAsync(response.data);

  return validatedData;
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
