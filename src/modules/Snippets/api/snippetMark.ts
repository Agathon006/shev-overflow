import { useMutation } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { queryClient } from '@/lib/react-query';
import { MutationConfigType } from '@/lib/react-query';
import { snippetMarkSchema } from '@/modules/Snippets/schemas/snippetMark';

type SnippetMarkOptionsType = {
  mutationConfig?: MutationConfigType<typeof postSnippetMark>;
  searchTerm?: string;
};

type SnippetMarkParams = { mark: 'like' | 'dislike' | 'none'; id: string };

export const postSnippetMark = async ({ mark, id }: SnippetMarkParams) => {
  const response = await api.post(`/snippets/${id}/mark`, { mark });

  return snippetMarkSchema.parseAsync(response.data);
};

export const useSnippetMark = ({
  mutationConfig,
  searchTerm = '',
}: SnippetMarkOptionsType = {}) => {
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
