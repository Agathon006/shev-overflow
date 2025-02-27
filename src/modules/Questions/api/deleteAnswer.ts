import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { AnswerSchema, answerSchema } from '@/schemas/answer';
import { QuestionSchema } from '@/schemas/question';

import { questionByIdQueryOptions } from './getQuestionById';

type DeleteAnswerOptions = {
  mutationConfig?: MutationConfigType<typeof deleteAnswer>;
  questionId: QuestionSchema['id'];
};

type DeleteAnswerProps = { answerId: AnswerSchema['id'] };

export const deleteAnswer = async ({ answerId }: DeleteAnswerProps) => {
  const response = await api.delete(`/answers/${answerId}`);

  return answerSchema.omit({ id: true }).parseAsync(response.data);
};

export const useDeleteAnswer = ({
  mutationConfig,
  questionId,
}: DeleteAnswerOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteAnswer,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: questionByIdQueryOptions(questionId).queryKey,
      });
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'questions',
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
