import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';

// import {
//   snippetsLinksResponseSchema,
//   snippetsResponseSchema,
// } from '../schemas/getSnippetsResponse';

type UseAuthOptionsType = {
  queryConfig?: QueryConfigType<typeof getSnippets>;
};

export const getSnippets = async ({ pageParam = 1 }) => {
  const response = await api.get('/snippets', {
    params: { page: pageParam, limit: 10 },
  });
  console.log(response);

  //   return {
  //     snippets: snippetsResponseSchema.parse(response.data.data),
  //     nextPage: snippetsLinksResponseSchema.parse(response.data.links)?.next
  //       ? pageParam + 1
  //       : null,
  //   };

  return {
    snippets: response.data.data,
    nextPage: response.data.links.next ? pageParam + 1 : null,
  };
};

export const SnippetsQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ['snippets'],
    queryFn: getSnippets,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: Infinity,
  });
};

export const useSnippets = ({ queryConfig }: UseAuthOptionsType = {}) => {
  return useInfiniteQuery({
    ...queryConfig,
    ...SnippetsQueryOptions(),
  });
};
