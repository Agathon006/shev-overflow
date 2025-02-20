import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';
import { User, userSchema } from '@/schemas/user';

import { statisticSchema } from '../schemas/userStatistic';

type GetUserStatisticByIdOptions = {
  queryConfig?: QueryConfigType<typeof getUserStatisticById>;
  id: User['id'];
};

export const getUserStatisticById = async (id: string) => {
  const response = await api.get(`/users/${id}/statistic`);

  return userSchema
    .extend({
      statistic: statisticSchema,
    })
    .parseAsync(response.data);
};

export const userStatisticByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['userStatistic', id],
    queryFn: () => getUserStatisticById(id),
  });
};

export const useUserStatisticById = (
  { queryConfig, id }: GetUserStatisticByIdOptions = { id: '' },
) => {
  return useQuery({
    ...queryConfig,
    ...userStatisticByIdQueryOptions(id),
  });
};
