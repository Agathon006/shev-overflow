import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';
import { linksSchema } from '@/schemas/links';
import { questionSchema } from '@/schemas/question';

type GetQuestionsOptions = {
  queryConfig?: QueryConfigType<typeof getQuestions>;
  searchTerm?: string;
  limit?: number;
};

export const getQuestions = async (
  limit: number,
  nextOffset = 1,
  search = '',
) => {
  const response = await api.get('/questions', {
    params: { page: nextOffset, limit, search },
  });

  const validated = await z
    .object({
      data: questionSchema.array(),
      links: linksSchema,
      meta: z.object({ totalItems: z.number() }),
    })
    .parseAsync(response.data);

  return {
    questions: validated.data,
    nextPage: validated.links.next ? nextOffset + 1 : null,
    totalCount: validated.meta.totalItems,
  };
};

export const questionsQueryOptions = (
  searchTerm: string,
  limit: number = 10,
) => {
  return infiniteQueryOptions({
    queryKey: ['questions', `searchTerm: ${searchTerm}`, `limit: ${limit}`],
    queryFn: ({ pageParam }) => getQuestions(limit, pageParam, searchTerm),
    getNextPageParam: (lastGroup) => lastGroup.nextPage,
    initialPageParam: 1,
    staleTime: searchTerm ? 0 : 1000 * 60 * 5,
  });
};

export const useQuestions = ({
  queryConfig,
  searchTerm = '',
  limit = 10,
}: GetQuestionsOptions = {}) => {
  return useInfiniteQuery({
    ...queryConfig,
    ...questionsQueryOptions(searchTerm, limit),
  });
};
