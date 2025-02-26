import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';
import { User, userSchema } from '@/schemas/user';

type GetUserByIdOptions = {
  queryConfig?: QueryConfigType<typeof getUserById>;
  id: User['id'];
};

export const getUserById = async (id: User['id']) => {
  const response = await api.get(`/users/${id}`);

  return userSchema.parseAsync(response.data);
};

export const userByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

export const useUserById = (
  { queryConfig, id }: GetUserByIdOptions = { id: '' },
) => {
  return useQuery({
    ...queryConfig,
    ...userByIdQueryOptions(id),
  });
};
