import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { snippetByIdQueryOptions, SnippetSchema } from '@/modules/Snippets';
import { CommentSchema, commentSchema } from '@/schemas/comment';

type DeleteCommentOptions = {
  mutationConfig?: MutationConfigType<typeof deleteComment>;
  snippetId: SnippetSchema['id'];
};

type DeleteCommentParams = { commentId: CommentSchema['id'] };

export const deleteComment = async ({ commentId }: DeleteCommentParams) => {
  const response = await api.delete(`/comments/${commentId}`);

  return commentSchema.omit({ id: true }).parseAsync(response.data);
};

export const useDeleteComment = ({
  mutationConfig,
  snippetId,
}: DeleteCommentOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: snippetByIdQueryOptions(snippetId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
