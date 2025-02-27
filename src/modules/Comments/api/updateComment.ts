import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/api-client';
import { snippetByIdQueryOptions } from '@/api/getSnippetById';
import { MutationConfigType } from '@/lib/react-query';
import { CommentSchema } from '@/schemas/comment';
import { SnippetSchema } from '@/schemas/snippet';

type UpdateCommentOptions = {
  mutationConfig?: MutationConfigType<typeof updateComment>;
  snippetId: SnippetSchema['id'];
};

type UpdateCommentProps = {
  commentId: CommentSchema['id'];
  content: CommentSchema['content'];
};

export const updateComment = async ({
  content,
  commentId,
}: UpdateCommentProps) => {
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
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'snippets',
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
