import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { commentSchema } from '@/schemas/comment';

type commentOptionsType = {
  mutationConfig?: MutationConfigType<typeof postComment>;
  content?: string;
  snippetId?: string;
};

type commentParams = { content: string; snippetId: string };

export const postComment = async ({ content, snippetId }: commentParams) => {
  const response = await api.post('/comments', { content, snippetId });

  return commentSchema.parseAsync(response.data);
};

export const useComment = ({
  mutationConfig,
  snippetId,
}: commentOptionsType = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: postComment,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: ['snippet', snippetId],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
