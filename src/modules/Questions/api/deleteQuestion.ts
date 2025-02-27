import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { questionByIdQueryOptions } from '@/api/getQuestionById';
import { MutationConfigType } from '@/lib/react-query';
import { QuestionSchema, questionSchema } from '@/schemas/question';

type DeleteQuestionOptions = {
  mutationConfig?: MutationConfigType<typeof deleteQuestion>;
  id: QuestionSchema['id'];
};

type DeleteQuestionProps = { id: QuestionSchema['id'] };

export const deleteQuestion = async ({ id }: DeleteQuestionProps) => {
  const response = await api.delete(`/questions/${id}`);

  return questionSchema
    .omit({ id: true, answers: true, isResolved: true })
    .parseAsync(response.data);
};

export const useDeleteQuestion = ({
  mutationConfig,
  id,
}: DeleteQuestionOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteQuestion,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: questionByIdQueryOptions(id),
      });
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'questions',
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
