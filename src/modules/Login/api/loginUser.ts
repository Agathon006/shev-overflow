import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/axiosInstance';

import { LoginFormInputsType } from '../schema/loginSchema';

type UserLoginSuccessResponseType = {
  id: number;
  username: string;
  role: string;
};

type UseLoginOptions = {
  mutationConfig?: {
    onSuccess?: (data: UserLoginSuccessResponseType) => void;
  };
};

export const loginUser = async (credentials: LoginFormInputsType) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
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
