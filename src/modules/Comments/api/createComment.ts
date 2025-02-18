import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { snippetByIdQueryOptions, SnippetSchema } from '@/modules/Snippets';
import { CommentSchema, commentSchema } from '@/schemas/comment';

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
