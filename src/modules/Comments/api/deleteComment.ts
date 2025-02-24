import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { snippetByIdQueryOptions } from '@/api/getSnippetById';
import { snippetsQueryOptions } from '@/api/getSnippets';
import { MutationConfigType } from '@/lib/react-query';
import { CommentSchema, commentSchema } from '@/schemas/comment';
import { SnippetSchema } from '@/schemas/snippet';

type DeleteCommentOptions = {
  mutationConfig?: MutationConfigType<typeof deleteComment>;
  snippetId: SnippetSchema['id'];
};

type DeleteCommentProps = { commentId: CommentSchema['id'] };

export const deleteComment = async ({ commentId }: DeleteCommentProps) => {
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
      await queryClient.invalidateQueries({
        queryKey: snippetsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
