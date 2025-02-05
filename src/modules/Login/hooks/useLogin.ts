import { useMutation, useQueryClient } from '@tanstack/react-query';

import { loginUser } from '../api/loginUser';

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
