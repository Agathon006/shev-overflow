import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';

type patchCommentOptionsType = {
  mutationConfig?: MutationConfigType<typeof patchComment>;
  snippetId?: string;
};

type patchCommentParams = { commentId: string; content: string };

export const patchComment = async ({
  content,
  commentId,
}: patchCommentParams) => {
  const response = await api.patch(`/comments/${commentId}`, { content });

  return z
    .object({
      updatedCount: z.string(),
    })
    .parseAsync(response.data);
};

export const usePatchComment = ({
  mutationConfig,
  snippetId,
}: patchCommentOptionsType) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: patchComment,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: ['snippet', snippetId],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
