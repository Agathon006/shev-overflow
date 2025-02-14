import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { commentSchema } from '@/schemas/comment';

type deleteCommentOptionsType = {
  mutationConfig?: MutationConfigType<typeof deleteComment>;
  snippetId?: string;
};

type deleteCommentParams = { commentId: string };

export const deleteComment = async ({ commentId }: deleteCommentParams) => {
  const response = await api.delete(`/comments/${commentId}`);

  return commentSchema.omit({ id: true }).parseAsync(response.data);
};

export const useDeleteComment = ({
  mutationConfig,
  snippetId,
}: deleteCommentOptionsType) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: ['snippet', snippetId],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
