import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { questionByIdQueryOptions } from '@/api/getQuestionById';
import { MutationConfigType } from '@/lib/react-query';
import { AnswerSchema, answerSchema } from '@/schemas/answer';
import { QuestionSchema } from '@/schemas/question';

type CreateAnswerOptions = {
  mutationConfig?: MutationConfigType<typeof createAnswer>;
  content?: AnswerSchema['content'];
  questionId: QuestionSchema['id'];
};

type CreateAnswerProps = {
  content: AnswerSchema['content'];
  questionId: QuestionSchema['id'];
};

export const createAnswer = async ({
  content,
  questionId,
}: CreateAnswerProps) => {
  const response = await api.post('/answers', { content, questionId });

  return answerSchema.parseAsync(response.data);
};

export const useAnswer = (
  { mutationConfig, questionId }: CreateAnswerOptions = { questionId: '' },
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createAnswer,
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
