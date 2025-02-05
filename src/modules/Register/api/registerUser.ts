import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/axiosInstance';

import { RegisterFormInputsType } from '../schema/registerSchema';

type UserRegisterSuccessResponseType = {
  id: number;
  username: string;
  role: string;
};

type UseRegisterOptionsType = {
  mutationConfig?: {
    onSuccess?: (data: UserRegisterSuccessResponseType) => void;
  };
};

export const registerUser = async (
  credentials: Omit<RegisterFormInputsType, 'confirmPassword'>,
) => {
  const response = await api.post('/register', credentials);
  return response.data;
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
