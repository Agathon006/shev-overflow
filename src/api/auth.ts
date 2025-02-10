import { queryOptions, useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/types/react-query';

type UseAuthOptionsType = {
  queryConfig?: QueryConfigType<typeof authUser>;
};

export const authResponseSchema = z
  .object({
    id: z.string(),
    username: z.string(),
    role: z.string(),
  })
  .nullable();

export const authUser = async () => {
  const response = await api.get('/auth');

  return authResponseSchema.parse(response.data);
};

export const authUserQueryOptions = () => {
  return queryOptions({
    queryKey: ['currentUser'],
    queryFn: () => authUser(),
    initialData: null,
  });
};

export const useAuth = ({ queryConfig }: UseAuthOptionsType = {}) => {
  return useQuery({
    ...queryConfig,
    ...authUserQueryOptions(),
  });
};
