import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { snippetByIdQueryOptions, SnippetSchema } from '@/modules/Snippets';
import { CommentSchema, commentSchema } from '@/schemas/comment';

type commentOptionsType = {
  mutationConfig?: MutationConfigType<typeof postComment>;
  content?: CommentSchema['content'];
  snippetId: SnippetSchema['id'];
};

type commentParams = { content: string; snippetId: string };

export const postComment = async ({ content, snippetId }: commentParams) => {
  const response = await api.post('/comments', { content, snippetId });

  return commentSchema.parseAsync(response.data);
};

export const useComment = (
  { mutationConfig, snippetId }: commentOptionsType = { snippetId: '' },
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: postComment,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: snippetByIdQueryOptions(snippetId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
