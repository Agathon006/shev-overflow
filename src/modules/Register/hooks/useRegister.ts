import { useMutation, useQueryClient } from '@tanstack/react-query';

import { registerUser } from '../api/registerUser';

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

export const useRegister = ({ mutationConfig }: UseRegisterOptionsType = {}) => {
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
