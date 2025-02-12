import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';
import { linksSchema } from '@/schemas/links';

import { snippetSchema } from '../schemas/snippet';

type UseSnippetsOptionsType = {
  queryConfig?: QueryConfigType<typeof getSnippets>;
  debouncedSearchTerm?: string;
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

  const validatedSnippets = await snippetSchema
    .array()
    .parseAsync(response.data.data);
  const validatedLinks = await linksSchema.parseAsync(response.data.links);

  return {
    snippets: validatedSnippets,
    nextPage: validatedLinks.next ? nextOffset + 1 : null,
  };
};

export const snippetsQueryOptions = (debouncedSearchTerm: string) => {
  return infiniteQueryOptions({
    queryKey: ['snippets', debouncedSearchTerm],
    queryFn: ({ pageParam }) =>
      getSnippets(SNIPPETS_LIST_LIMIT, pageParam, debouncedSearchTerm),
    getNextPageParam: (lastGroup) => lastGroup.nextPage,
    initialPageParam: 0,
    staleTime: Infinity,
  });
};

export const useSnippets = ({
  queryConfig,
  debouncedSearchTerm = '',
}: UseSnippetsOptionsType = {}) => {
  return useInfiniteQuery({
    ...queryConfig,
    ...snippetsQueryOptions(debouncedSearchTerm),
  });
};
