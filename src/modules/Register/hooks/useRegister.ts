import { useMutation } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/types/react-query';

import { RegisterSchema } from '../schemas/register';
import { registerResponseSchema } from '../schemas/registerResponse';

type UseRegisterOptionsType = {
  mutationConfig?: MutationConfigType<typeof registerUser>;
};

export const registerUser = async (
  credentials: Omit<RegisterSchema, 'confirmPassword'>,
) => {
  const response = await api.post('/register', credentials);

  return registerResponseSchema.parseAsync(response.data);
};

export const useRegister = ({
  mutationConfig,
}: UseRegisterOptionsType = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
