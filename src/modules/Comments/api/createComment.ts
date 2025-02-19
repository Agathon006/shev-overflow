import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { snippetByIdQueryOptions } from '@/api/getSnippetById';
import { MutationConfigType } from '@/lib/react-query';
import { CommentSchema, commentSchema } from '@/schemas/comment';
import { SnippetSchema } from '@/schemas/snippet';

type CreateCommentOptions = {
  mutationConfig?: MutationConfigType<typeof createComment>;
  content?: CommentSchema['content'];
  snippetId: SnippetSchema['id'];
};

type CreateCommentParams = {
  content: CommentSchema['content'];
  snippetId: SnippetSchema['id'];
};

export const createComment = async ({
  content,
  snippetId,
}: CreateCommentParams) => {
  const response = await api.post('/comments', { content, snippetId });

  return commentSchema.parseAsync(response.data);
};

export const useComment = (
  { mutationConfig, snippetId }: CreateCommentOptions = { snippetId: '' },
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createComment,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: snippetByIdQueryOptions(snippetId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
