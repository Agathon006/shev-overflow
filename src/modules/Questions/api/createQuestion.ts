import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { questionByIdQueryOptions } from '@/api/getQuestionById';
import { MutationConfigType } from '@/lib/react-query';
import { questionSchema } from '@/schemas/question';

import { QuestionEditSchema } from '../schemas/questionEdit';

type CreateQuestionOptions = {
  mutationConfig?: MutationConfigType<typeof createQuestion>;
};

export const createQuestion = async (newQuestion: QuestionEditSchema) => {
  const response = await api.post('/questions', newQuestion);

  return questionSchema
    .omit({ answers: true, isResolved: true })
    .parseAsync(response.data);
};

export const useCreateQuestion = ({
  mutationConfig,
}: CreateQuestionOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: async (data, ...args) => {
      await queryClient.invalidateQueries({
        queryKey: questionByIdQueryOptions(data.id),
      });
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'questions',
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
  });
};
