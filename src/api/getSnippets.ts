import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';
import { linksSchema } from '@/schemas/links';
import { snippetSchema } from '@/schemas/snippet';

type GetSnippetsOptions = {
  queryConfig?: QueryConfigType<typeof getSnippets>;
  searchTerm?: string;
  userId?: string;
};

const SNIPPETS_LIST_LIMIT = 10;

export const getSnippets = async (
  limit: number,
  nextOffset = 1,
  search = '',
  userId?: string,
) => {
  const response = await api.get('/snippets', {
    params: { userId, page: nextOffset, limit, search },
  });

  const validated = await z
    .object({
      data: snippetSchema.array(),
      links: linksSchema,
    })
    .parseAsync(response.data);

  return {
    snippets: validated.data,
    nextPage: validated.links.next ? nextOffset + 1 : null,
  };
};

export const snippetsQueryOptions = (searchTerm = '', userId?: string) => {
  return infiniteQueryOptions({
    queryKey: userId
      ? ['snippets', searchTerm, userId]
      : ['snippets', searchTerm],
    queryFn: ({ pageParam }) =>
      getSnippets(SNIPPETS_LIST_LIMIT, pageParam, searchTerm, userId),
    getNextPageParam: (lastGroup) => lastGroup.nextPage,
    initialPageParam: 1,
    staleTime: searchTerm ? 0 : 1000 * 60 * 5,
  });
};

export const useSnippets = ({
  queryConfig,
  searchTerm = '',
  userId,
}: GetSnippetsOptions = {}) => {
  return useInfiniteQuery({
    ...queryConfig,
    ...snippetsQueryOptions(searchTerm, userId),
  });
};
