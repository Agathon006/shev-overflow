import { useMutation } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { userSchema } from '@/schemas/user';

import { RegisterSchema } from '../schemas/register';

type RegisterOptions = {
  mutationConfig?: MutationConfigType<typeof registerUser>;
};

export const registerUser = async (
  credentials: Omit<RegisterSchema, 'confirmPassword'>,
) => {
  const response = await api.post('/register', credentials);

  return userSchema.parseAsync(response.data);
};

export const useRegister = ({ mutationConfig }: RegisterOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
