import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/types/react-query';

export const authResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.string(),
});

export const authUser = async () => {
  const response = await api.get('/auth');

  return authResponseSchema.parse(response.data);
};

type UseAuthOptionsType = {
  queryConfig?: QueryConfigType<typeof authUser>;
};

export const useAuth = ({ queryConfig }: UseAuthOptionsType = {}) => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authUser,
    retry: false,
    ...queryConfig,
  });
};
