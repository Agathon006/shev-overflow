import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { snippetByIdQueryOptions, SnippetSchema } from '@/modules/Snippets';
import { CommentSchema } from '@/schemas/comment';

type PatchCommentOptions = {
  mutationConfig?: MutationConfigType<typeof patchComment>;
  snippetId: SnippetSchema['id'];
};

type PatchCommentParams = {
  commentId: CommentSchema['id'];
  content: CommentSchema['content'];
};

export const patchComment = async ({
  content,
  commentId,
}: PatchCommentParams) => {
  const response = await api.patch(`/comments/${commentId}`, { content });

  return z
    .object({
      updatedCount: z.number(),
    })
    .parseAsync(response.data);
};

export const usePatchComment = ({
  mutationConfig,
  snippetId,
}: PatchCommentOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: patchComment,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: snippetByIdQueryOptions(snippetId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
