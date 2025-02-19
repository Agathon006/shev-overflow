import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { snippetByIdQueryOptions } from '@/api/getSnippetById';
import { MutationConfigType } from '@/lib/react-query';
import { snippetSchema } from '@/schemas/snippet';

import { SnippetEditSchema } from '../schemas/snippetEdit';
import { snippetsQueryOptions } from './getSnippets';

type CreateSnippetOptions = {
  mutationConfig?: MutationConfigType<typeof createSnippet>;
};

export const createSnippet = async (newSnippet: SnippetEditSchema) => {
  const response = await api.post('/snippets', newSnippet);

  return snippetSchema
    .omit({ comments: true, marks: true })
    .parseAsync(response.data);
};

export const useCreateSnippet = ({
  mutationConfig,
}: CreateSnippetOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createSnippet,
    onSuccess: async (data, ...args) => {
      await queryClient.invalidateQueries({
        queryKey: snippetByIdQueryOptions(data.id).queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: snippetsQueryOptions('').queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
  });
};
