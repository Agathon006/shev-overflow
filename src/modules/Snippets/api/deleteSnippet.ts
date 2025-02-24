import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { snippetByIdQueryOptions } from '@/api/getSnippetById';
import { snippetsQueryOptions } from '@/api/getSnippets';
import { MutationConfigType } from '@/lib/react-query';
import { SnippetSchema } from '@/schemas/snippet';

import { snippetStatisticSchema } from '../schemas/snippetStatistic';

type DeleteSnippetOptions = {
  mutationConfig?: MutationConfigType<typeof deleteSnippet>;
  snippetId: SnippetSchema['id'];
};

type DeleteSnippetProps = { snippetId: SnippetSchema['id'] };

export const deleteSnippet = async ({ snippetId }: DeleteSnippetProps) => {
  const response = await api.delete(`/snippets/${snippetId}`);

  return snippetStatisticSchema.omit({ id: true }).parseAsync(response.data);
};

export const useDeleteSnippet = ({
  mutationConfig,
  snippetId,
}: DeleteSnippetOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteSnippet,
    onSuccess: async (...args) => {
      queryClient.removeQueries({
        queryKey: snippetByIdQueryOptions(snippetId).queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: snippetsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
