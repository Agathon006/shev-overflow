import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { snippetByIdQueryOptions, SnippetSchema } from '@/modules/Snippets';
import { CommentSchema } from '@/schemas/comment';

type UpdateCommentOptions = {
  mutationConfig?: MutationConfigType<typeof updateComment>;
  snippetId: SnippetSchema['id'];
};

type UpdateCommentParams = {
  commentId: CommentSchema['id'];
  content: CommentSchema['content'];
};

export const updateComment = async ({
  content,
  commentId,
}: UpdateCommentParams) => {
  const response = await api.patch(`/comments/${commentId}`, { content });

  return z
    .object({
      updatedCount: z.number(),
    })
    .parseAsync(response.data);
};

export const useUpdateComment = ({
  mutationConfig,
  snippetId,
}: UpdateCommentOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateComment,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: snippetByIdQueryOptions(snippetId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
