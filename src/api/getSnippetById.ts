import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';
import { SnippetSchema, snippetSchema } from '@/schemas/snippet';

type GetSnippetByIdOptions = {
  queryConfig?: QueryConfigType<typeof getSnippetById>;
  id: SnippetSchema['id'];
};

export const getSnippetById = async (id: string) => {
  const response = await api.get(`/snippets/${id}`);

  return snippetSchema.parseAsync(response.data);
};

export const snippetByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['snippet', id],
    queryFn: () => getSnippetById(id),
    enabled: !!id,
  });
};

export const useSnippetById = (
  { queryConfig, id }: GetSnippetByIdOptions = { id: '' },
) => {
  return useQuery({
    ...queryConfig,
    ...snippetByIdQueryOptions(id),
  });
};
