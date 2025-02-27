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
  page?: number;
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
      data: questionSchema
        .extend({
          answers: questionSchema.shape.answers.element
            .omit({ user: true })
            .array(),
        })
        .array(),
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
  searchTerm = '',
  limit: number = 10,
  page: number = 1,
) => {
  return infiniteQueryOptions({
    queryKey: ['questions', searchTerm, limit, page],
    queryFn: () => getQuestions(limit, page, searchTerm),
    getNextPageParam: () => null,
    initialPageParam: 1,
  });
};

export const useQuestions = ({
  queryConfig,
  searchTerm = '',
  limit = 10,
  page = 1,
}: GetQuestionsOptions = {}) => {
  return useInfiniteQuery({
    ...queryConfig,
    ...questionsQueryOptions(searchTerm, limit, page),
  });
};
