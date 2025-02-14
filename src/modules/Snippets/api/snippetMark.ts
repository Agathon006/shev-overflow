import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';
import { snippetMarkSchema } from '@/modules/Snippets/schemas/snippetMark';

type SnippetMarkOptionsType = {
  mutationConfig?: MutationConfigType<typeof postSnippetMark>;
  searchTerm?: null | string;
  snippetId?: string;
};

type SnippetMarkParams = { mark: 'like' | 'dislike' | 'none'; id: string };

export const postSnippetMark = async ({ mark, id }: SnippetMarkParams) => {
  const response = await api.post(`/snippets/${id}/mark`, { mark });

  return snippetMarkSchema.parseAsync(response.data);
};

export const useSnippetMark = ({
  mutationConfig,
  searchTerm = null,
  snippetId,
}: SnippetMarkOptionsType = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: postSnippetMark,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey:
          searchTerm !== null
            ? ['snippets', searchTerm]
            : ['snippet', snippetId],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
