import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { authUserQueryOptions } from '@/api/auth';
import { MutationConfigType } from '@/lib/react-query';

type DeleteUserByIdOptions = {
  mutationConfig?: MutationConfigType<typeof deleteUserById>;
};

export const deleteUserById = async () => {
  await api.delete('/me');
};

export const useDeleteUserById = ({
  mutationConfig,
}: DeleteUserByIdOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteUserById,
    onSuccess: (...args) => {
      queryClient.setQueryData(authUserQueryOptions().queryKey, null);
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
