import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { AnswerSchema } from '@/schemas/answer';
import { QuestionSchema } from '@/schemas/question';

import { questionByIdQueryOptions } from './getQuestionById';
import { questionsQueryOptions } from './getQuestions';

type UpdateAnswerOptions = {
  mutationConfig?: MutationConfigType<typeof updateAnswer>;
  questionId: QuestionSchema['id'];
};

type UpdateAnswerProps = {
  answerId: AnswerSchema['id'];
  content: AnswerSchema['content'];
};

export const updateAnswer = async ({
  content,
  answerId,
}: UpdateAnswerProps) => {
  const response = await api.patch(`/answers/${answerId}`, { content });

  console.log(response);

  return z
    .object({
      affectedCount: z.number(),
    })
    .parseAsync(response.data);
};

export const useUpdateAnswer = ({
  mutationConfig,
  questionId,
}: UpdateAnswerOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateAnswer,
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
