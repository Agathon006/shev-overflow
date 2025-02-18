import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';

import { SnippetSchema } from '../schemas/snippet';
import { snippetStatisticSchema } from '../schemas/snippetStatistic';
import { snippetByIdQueryOptions } from './getSnippetById';
import { snippetsQueryOptions } from './getSnippets';

type DeleteSnippetsOptions = {
  mutationConfig?: MutationConfigType<typeof deleteSnippet>;
  snippetId: SnippetSchema['id'];
};

type DeleteSnippetsParams = { snippetId: SnippetSchema['id'] };

export const deleteSnippet = async ({ snippetId }: DeleteSnippetsParams) => {
  const response = await api.delete(`/snippets/${snippetId}`);

  return snippetStatisticSchema.omit({ id: true }).parseAsync(response.data);
};

export const useDeleteSnippet = ({
  mutationConfig,
  snippetId,
}: DeleteSnippetsOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteSnippet,
    onSuccess: async (...args) => {
      queryClient.removeQueries({
        queryKey: snippetByIdQueryOptions(snippetId).queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: snippetsQueryOptions('').queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
