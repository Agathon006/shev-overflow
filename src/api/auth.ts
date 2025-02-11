import { queryOptions, useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';

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
  try {
    const response = await api.get('/auth');

    return authResponseSchema.parse(response.data);
  } catch {
    return null;
  }
};

export const authUserQueryOptions = () => {
  return queryOptions({
    queryKey: ['currentUser'],
    queryFn: authUser,
  });
};

export const useAuth = ({ queryConfig }: UseAuthOptionsType = {}) => {
  return useQuery({
    ...queryConfig,
    ...authUserQueryOptions(),
  });
};
