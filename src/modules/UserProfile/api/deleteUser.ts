import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { authUserQueryOptions } from '@/api/auth';
import { MutationConfigType } from '@/lib/react-query';

type DeleteUserOptions = {
  mutationConfig?: MutationConfigType<typeof deleteUser>;
};

export const deleteUser = async () => {
  await api.delete('/me');
};

export const useDeleteUser = ({ mutationConfig }: DeleteUserOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async (...args) => {
      queryClient.setQueryData(authUserQueryOptions().queryKey, null);
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'snippets',
      });
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'users',
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
