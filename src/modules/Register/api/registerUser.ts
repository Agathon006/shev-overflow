import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';

import { RegisterFormInputsType } from '../schemas/registerSchema';
import {
  SuccessResponseSchema,
  SuccessResponseType,
} from '../schemas/successResponseSchema';

type UseRegisterOptionsType = {
  mutationConfig?: {
    onSuccess?: (data: SuccessResponseType) => void;
  };
};

export const registerUser = async (
  credentials: Omit<RegisterFormInputsType, 'confirmPassword'>,
) => {
  const response = await api.post('/register', credentials);

  const validatedData = await SuccessResponseSchema.parseAsync(response.data);

  return validatedData;
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
