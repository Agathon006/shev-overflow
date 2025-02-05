import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/types/react-query';

import { registerResponseSchema } from '../schemas/registerResponseSchema';
import { RegisterFormInputsType } from '../schemas/registerSchema';

export const registerUser = async (
  credentials: Omit<RegisterFormInputsType, 'confirmPassword'>,
) => {
  const response = await api.post('/register', credentials);

  return registerResponseSchema.parseAsync(response.data);
};

type UseRegisterOptionsType = {
  mutationConfig?: MutationConfigType<typeof registerUser>;
};

export const useRegister = ({
  mutationConfig,
}: UseRegisterOptionsType = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      mutationConfig?.onSuccess?.(data, variables, context);
    },
    ...mutationConfig,
  });
};
