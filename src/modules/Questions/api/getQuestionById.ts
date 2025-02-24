import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { QueryConfigType } from '@/lib/react-query';
import { QuestionSchema, questionSchema } from '@/schemas/question';

type GetQuestionByIdOptions = {
  queryConfig?: QueryConfigType<typeof getQuestionById>;
  id: QuestionSchema['id'];
};

export const getQuestionById = async (id: string) => {
  const response = await api.get(`/questions/${id}`);

  return questionSchema.parseAsync(response.data);
};

export const questionByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['question', id],
    queryFn: () => getQuestionById(id),
    enabled: !!id,
  });
};

export const useQuestionById = (
  { queryConfig, id }: GetQuestionByIdOptions = { id: '' },
) => {
  return useQuery({
    ...queryConfig,
    ...questionByIdQueryOptions(id),
  });
};
