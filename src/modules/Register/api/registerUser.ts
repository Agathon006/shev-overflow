import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';

import {
  registerResponseSchema,
  RegisterResponseType,
} from '../schemas/registerResponseSchema';
import { RegisterFormInputsType } from '../schemas/registerSchema';

type UseRegisterOptionsType = {
  mutationConfig?: {
    onSuccess?: (data: RegisterResponseType) => void;
  };
};

export const registerUser = async (
  credentials: Omit<RegisterFormInputsType, 'confirmPassword'>,
) => {
  const response = await api.post('/register', credentials);

  return registerResponseSchema.parseAsync(response.data);
};

export const useRegister = ({
  mutationConfig,
}: UseRegisterOptionsType = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      onSuccess?.(data);
    },
    ...restConfig,
  });
};
