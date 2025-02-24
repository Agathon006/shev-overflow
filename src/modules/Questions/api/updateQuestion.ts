import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { QuestionSchema, questionSchema } from '@/schemas/question';

import { questionByIdQueryOptions } from './getQuestionById';
import { questionsQueryOptions } from './getQuestions';

type UpdateQuestionOptions = {
  mutationConfig?: MutationConfigType<typeof updateQuestion>;
  id: QuestionSchema['id'];
};

type UpdateQuestionProps = {
  questionId: QuestionSchema['id'];
  content: Pick<QuestionSchema, 'title' | 'description' | 'attachedCode'>;
};

export const updateQuestion = async ({
  questionId,
  content,
}: UpdateQuestionProps) => {
  const response = await api.patch(`/questions/${questionId}`, content);

  return questionSchema
    .omit({ answers: true, isResolved: true })
    .parseAsync(response.data);
};

export const useUpdateQuestion = ({
  mutationConfig,
  id,
}: UpdateQuestionOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateQuestion,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: questionByIdQueryOptions(id),
      });
      await queryClient.invalidateQueries({
        queryKey: questionsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
