import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/types/react-query';

export const logoutUser = async () => {
  await api.post('/auth/logout');
};

type UseLogoutOptionsType = {
  mutationConfig?: MutationConfigType<typeof logoutUser>;
};

export const useLogout = ({ mutationConfig }: UseLogoutOptionsType = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: async (...args) => {
      await queryClient.setQueryData(['currentUser'], null);
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
