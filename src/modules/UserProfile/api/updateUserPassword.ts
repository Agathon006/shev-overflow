import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { authUserQueryOptions } from '@/api/auth';
import { MutationConfigType } from '@/lib/react-query';
import { Password } from '@/schemas/password';

type UpdateUserPasswordProps = {
  oldPassword: Password;
  newPassword: Password;
};

type UpdateUserPasswordOptions = {
  mutationConfig?: MutationConfigType<typeof updateUserPassword>;
};

export const updateUserPassword = async (data: UpdateUserPasswordProps) => {
  await api.patch('/me/password', data);
  return data;
};

export const useUpdateUserPassword = ({
  mutationConfig,
}: UpdateUserPasswordOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateUserPassword,
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(authUserQueryOptions().queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          password: data.newPassword,
        };
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
  });
};
