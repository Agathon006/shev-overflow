import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { questionByIdQueryOptions } from '@/api/getQuestionById';
import { MutationConfigType } from '@/lib/react-query';
import { QuestionSchema, questionSchema } from '@/schemas/question';

import { QuestionEditSchema } from '../schemas/questionEdit';

type UpdateQuestionOptions = {
  mutationConfig?: MutationConfigType<typeof updateQuestion>;
  id: QuestionSchema['id'];
};

type UpdateQuestionProps = {
  questionId: QuestionSchema['id'];
  content: QuestionEditSchema;
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
        predicate: (query) => query.queryKey[0] === 'questions',
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
