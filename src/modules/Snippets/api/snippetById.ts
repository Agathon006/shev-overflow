import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';

import { snippetSchema } from '../schemas/snippet';

type UseSnippetsOptionsType = {
  queryConfig?: QueryConfigType<typeof getSnippetById>;
  id: string;
};

export const getSnippetById = async (id: string) => {
  const response = await api.get(`/snippets/${id}`);

  return snippetSchema.parseAsync(response.data);
};

export const snippetByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['snippet', id],
    queryFn: () => getSnippetById(id),
  });
};

export const useSnippetById = (
  { queryConfig, id }: UseSnippetsOptionsType = { id: '' },
) => {
  return useQuery({
    ...queryConfig,
    ...snippetByIdQueryOptions(id),
  });
};
