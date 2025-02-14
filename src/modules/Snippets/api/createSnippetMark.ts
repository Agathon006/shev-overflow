import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';

import { SnippetSchema } from '../schemas/snippet';
import { snippetMarkSchema } from '../schemas/snippetMark';
import { snippetByIdQueryOptions } from './getSnippetById';
import { snippetsQueryOptions } from './getSnippets';

type CreateSnippetMarkOptions = {
  mutationConfig?: MutationConfigType<typeof createSnippetMark>;
  searchTerm?: null | string;
  snippetId: SnippetSchema['id'];
};

type CreateSnippetMarkParams = {
  mark: 'like' | 'dislike' | 'none';
  id: SnippetSchema['id'];
};

export const createSnippetMark = async ({
  mark,
  id,
}: CreateSnippetMarkParams) => {
  const response = await api.post(`/snippets/${id}/mark`, { mark });

  return snippetMarkSchema.parseAsync(response.data);
};

export const useSnippetMark = (
  { mutationConfig, searchTerm = null, snippetId }: CreateSnippetMarkOptions = {
    snippetId: '',
  },
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createSnippetMark,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey:
          searchTerm !== null
            ? snippetsQueryOptions(searchTerm).queryKey
            : snippetByIdQueryOptions(snippetId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
