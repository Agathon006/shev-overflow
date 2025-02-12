import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';

import { snippetsResponseSchema } from '../schemas/getSnippetsResponse';

type UseAuthOptionsType = {
  queryConfig?: QueryConfigType<typeof getSnippets>;
};

const SNIPPETS_LIST_LIMIT = 10;

export const getSnippets = async (limit: number, nextOffset = 1) => {
  const response = await api.get('/snippets', {
    params: { page: nextOffset, limit },
  });

  const validatedData = await snippetsResponseSchema.parseAsync(response.data);

  return {
    snippets: validatedData.data,
    nextPage: validatedData.links.next ? nextOffset + 1 : null,
  };
};

export const SnippetsQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ['snippets'],
    queryFn: (ctx) => getSnippets(SNIPPETS_LIST_LIMIT, ctx.pageParam),
    getNextPageParam: (lastGroup) => lastGroup.nextPage,
    initialPageParam: 0,
    staleTime: Infinity,
  });
};

export const useSnippets = ({ queryConfig }: UseAuthOptionsType = {}) => {
  return useInfiniteQuery({
    ...queryConfig,
    ...SnippetsQueryOptions(),
  });
};
