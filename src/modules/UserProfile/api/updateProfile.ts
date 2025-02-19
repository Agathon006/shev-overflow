import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { authUserQueryOptions } from '@/api/auth';
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
