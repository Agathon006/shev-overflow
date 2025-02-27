import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { AnswerSchema, answerSchema } from '@/schemas/answer';
import { QuestionSchema, questionSchema } from '@/schemas/question';

import { questionByIdQueryOptions } from './getQuestionById';
import { questionsQueryOptions } from './getQuestions';

type UpdateAnswerApproveOptions = {
  mutationConfig?: MutationConfigType<typeof updateAnswerApprove>;
  questionId: QuestionSchema['id'];
};

type UpdateAnswerApproveProps = {
  answerId: AnswerSchema['id'];
  state: 'correct' | 'incorrect';
};

export const updateAnswerApprove = async ({
  answerId,
  state,
}: UpdateAnswerApproveProps) => {
  const response = await api.put(`/answers/${answerId}/state/${state}`);

  return answerSchema
    .omit({ user: true })
    .extend({
      question: questionSchema.omit({
        user: true,
        answers: true,
        isResolved: true,
      }),
    })
    .parseAsync(response.data);
};

export const useUpdateAnswerApprove = ({
  mutationConfig,
  questionId,
}: UpdateAnswerApproveOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateAnswerApprove,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: questionByIdQueryOptions(questionId).queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: questionsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
