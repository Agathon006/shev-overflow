import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';

import { SnipetListSchema } from '../schemas/snippetList';

type UseSnippetsOptionsType = {
  queryConfig?: QueryConfigType<typeof getSnippets>;
  searchTerm?: string;
};

const SNIPPETS_LIST_LIMIT = 10;

export const getSnippets = async (
  limit: number,
  nextOffset = 1,
  search = '',
) => {
  const response = await api.get('/snippets', {
    params: { page: nextOffset, limit, search },
  });

  const validatedData = await SnipetListSchema.parseAsync(response.data);

  return {
    snippets: validatedData.data,
    nextPage: validatedData.links.next ? nextOffset + 1 : null,
  };
};

export const snippetsQueryOptions = (searchTerm: string) => {
  return infiniteQueryOptions({
    queryKey: ['snippets', searchTerm],
    queryFn: ({ pageParam }) =>
      getSnippets(SNIPPETS_LIST_LIMIT, pageParam, searchTerm),
    getNextPageParam: (lastGroup) => lastGroup.nextPage,
    initialPageParam: 0,
    staleTime: Infinity,
  });
};

export const useSnippets = ({
  queryConfig,
  searchTerm = '',
}: UseSnippetsOptionsType = {}) => {
  return useInfiniteQuery({
    ...queryConfig,
    ...snippetsQueryOptions(searchTerm),
  });
};
