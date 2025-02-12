import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';

import {
  snippetsLinksResponseSchema,
  snippetsResponseSchema,
} from '../schemas/getSnippetsResponse';

type UseAuthOptionsType = {
  queryConfig?: QueryConfigType<typeof getSnippets>;
};

const SNIPPETS_LIST_LIMIT = 10;

export const getSnippets = async (limit: number, nextOffset = 1) => {
  const response = await api.get('/snippets', {
    params: { page: nextOffset, limit },
  });

  return {
    snippets: snippetsResponseSchema.parse(response.data.data),
    nextPage: snippetsLinksResponseSchema.parse(response.data.links)?.next
      ? nextOffset + 1
      : null,
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
