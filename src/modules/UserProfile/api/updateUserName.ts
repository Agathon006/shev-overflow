import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { authUserQueryOptions } from '@/api/auth';
import { MutationConfigType } from '@/lib/react-query';
import { User } from '@/schemas/user';

type UpdateUsernameProps = { username: User['username'] };

type UpdateUserNameOptions = {
  mutationConfig?: MutationConfigType<typeof updateUserName>;
};

export const updateUserName = async (data: UpdateUsernameProps) => {
  await api.patch('/me', data);
  return data;
};

export const useUpdateUserName = ({
  mutationConfig,
}: UpdateUserNameOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateUserName,
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(authUserQueryOptions().queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          username: data.username,
        };
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
  });
};
