import { useMutation } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { queryClient } from '@/lib/react-query';
import { MutationConfigType } from '@/lib/react-query';
import { snippetMarkSchema } from '@/schemas/snippetMark';

type useSnippetMarkOptionsType = {
  mutationConfig?: MutationConfigType<typeof postSnippetMark>;
  searchTerm?: string;
};

type SnippetMarkParams = { mark: 'like' | 'dislike'; id: string };

export const postSnippetMark = async ({ mark, id }: SnippetMarkParams) => {
  const response = await api.post(`/snippets/${id}/mark`, { mark });

  return snippetMarkSchema.parseAsync(response.data);
};

export const useSnippetMark = ({
  mutationConfig,
  searchTerm = '',
}: useSnippetMarkOptionsType = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: postSnippetMark,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: ['snippets', searchTerm],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
