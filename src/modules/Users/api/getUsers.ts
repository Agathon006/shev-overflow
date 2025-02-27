import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';
import { linksSchema } from '@/schemas/links';
import { userSchema } from '@/schemas/user';

type GetUsersOptions = {
  queryConfig?: QueryConfigType<typeof getUsers>;
  searchTerm?: string;
};

const USERS_LIST_LIMIT = 10;

export const getUsers = async (limit: number, nextOffset = 1, search = '') => {
  const response = await api.get('/users', {
    params: { page: nextOffset, limit, search },
  });

  const validated = await z
    .object({
      data: userSchema.array(),
      links: linksSchema,
    })
    .parseAsync(response.data);

  return {
    users: validated.data,
    nextPage: validated.links.next ? nextOffset + 1 : null,
  };
};

export const usersQueryOptions = (searchTerm = '') => {
  return infiniteQueryOptions({
    queryKey: ['users', searchTerm],
    queryFn: ({ pageParam }) =>
      getUsers(USERS_LIST_LIMIT, pageParam, searchTerm),
    getNextPageParam: (lastGroup) => lastGroup.nextPage,
    initialPageParam: 1,
  });
};

export const useUsers = ({
  queryConfig,
  searchTerm = '',
}: GetUsersOptions = {}) => {
  return useInfiniteQuery({
    ...queryConfig,
    ...usersQueryOptions(searchTerm),
  });
};
