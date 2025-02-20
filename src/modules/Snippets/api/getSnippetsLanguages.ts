import { queryOptions, useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';

type GetSnippetsLanguagesOptions = {
  queryConfig?: QueryConfigType<typeof getSnippetsLanguages>;
};

export const getSnippetsLanguages = async () => {
  const response = await api.get('/snippets/languages');

  return await z.array(z.string()).parseAsync(response.data);
};

export const snippetsLanguagesQueryOptions = () => {
  return queryOptions({
    queryKey: ['snippetsLanguages'],
    queryFn: getSnippetsLanguages,
  });
};

export const useSnippetsLanguages = ({
  queryConfig,
}: GetSnippetsLanguagesOptions = {}) => {
  return useQuery({
    ...queryConfig,
    ...snippetsLanguagesQueryOptions(),
  });
};
