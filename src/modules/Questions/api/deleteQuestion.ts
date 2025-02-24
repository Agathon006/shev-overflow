import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { QuestionSchema, questionSchema } from '@/schemas/question';

import { questionsQueryOptions } from './getQuestions';

type DeleteQuestionOptions = {
  mutationConfig?: MutationConfigType<typeof deleteQuestion>;
};

type DeleteQuestionProps = { questionId: QuestionSchema['id'] };

export const deleteQuestion = async ({ questionId }: DeleteQuestionProps) => {
  const response = await api.delete(`/questions/${questionId}`);

  return questionSchema
    .omit({ id: true, answers: true, isResolved: true })
    .parseAsync(response.data);
};

export const useDeleteQuestion = ({
  mutationConfig,
}: DeleteQuestionOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteQuestion,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: questionsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
