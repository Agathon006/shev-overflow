import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';
import { userSchema } from '@/schemas/user';

type UseAuthOptionsType = {
  queryConfig?: QueryConfigType<typeof getAuthUser>;
};

export const authResponseSchema = userSchema.nullable();

export const getAuthUser = async () => {
  try {
    const response = await api.get('/auth');

    return authResponseSchema.parseAsync(response.data);
  } catch {
    return null;
  }
};

export const authUserQueryOptions = () => {
  return queryOptions({
    queryKey: ['currentUser'],
    queryFn: getAuthUser,
  });
};

export const useAuth = ({ queryConfig }: UseAuthOptionsType = {}) => {
  return useQuery({
    ...queryConfig,
    ...authUserQueryOptions(),
  });
};
