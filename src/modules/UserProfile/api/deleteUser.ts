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

export const useDeleteUser = ({
  mutationConfig,
}: DeleteUserOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (...args) => {
      queryClient.setQueryData(authUserQueryOptions().queryKey, null);
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
