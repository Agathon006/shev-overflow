import { useMutation } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';

import { ChangePasswordSchema } from '../schemas/changePassword';

type UpdateUserPasswordProps = Pick<
  ChangePasswordSchema,
  'oldPassword' | 'newPassword'
>;

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
