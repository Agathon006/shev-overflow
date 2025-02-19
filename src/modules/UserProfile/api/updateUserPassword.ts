import { useMutation } from '@tanstack/react-query';

import { api } from '@/api/api-client';
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
  return useMutation({
    mutationFn: updateUserPassword,
    ...mutationConfig,
  });
};
