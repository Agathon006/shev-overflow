import { useMutation } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { authUserQueryOptions } from '@/api/auth';
import { queryClient } from '@/App';
import { MutationConfigType } from '@/lib/react-query';

type UseLogoutOptionsType = {
  mutationConfig?: MutationConfigType<typeof logoutUser>;
};

export const logoutUser = async () => {
  await api.post('/auth/logout');
};

export const useLogout = ({ mutationConfig }: UseLogoutOptionsType = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (...args) => {
      queryClient.setQueryData(authUserQueryOptions().queryKey, null);
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
