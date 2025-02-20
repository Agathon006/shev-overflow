import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { authUserQueryOptions } from '@/api/auth';
import { snippetsQueryOptions } from '@/api/getSnippets';
import { usersQueryOptions } from '@/api/getUsers';
import { MutationConfigType } from '@/lib/react-query';
import { Username } from '@/schemas/username';

type UpdateProfileProps = { username: Username };

type UpdateProfileOptions = {
  mutationConfig?: MutationConfigType<typeof updateProfile>;
};

export const updateProfile = async (data: UpdateProfileProps) => {
  await api.patch('/me', data);
  return data;
};

export const useUpdateProfile = ({
  mutationConfig,
}: UpdateProfileOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: async (data, ...args) => {
      queryClient.setQueryData(authUserQueryOptions().queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          username: data.username,
        };
      });
      await queryClient.invalidateQueries({
        queryKey: snippetsQueryOptions('').queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: usersQueryOptions('').queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
  });
};
