import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/api-client';
import { snippetByIdQueryOptions } from '@/api/getSnippetById';
import { snippetsQueryOptions } from '@/api/getSnippets';
import { MutationConfigType } from '@/lib/react-query';
import { SnippetSchema } from '@/schemas/snippet';

import { SnippetEditSchema } from '../schemas/snippetEdit';

type EditSnippetOptions = {
  mutationConfig?: MutationConfigType<typeof editSnippet>;
  snippetId: SnippetSchema['id'];
};

type EditSnippetParams = SnippetEditSchema & { snippetId: SnippetSchema['id'] };

export const editSnippet = async ({
  snippetId,
  ...newSnippet
}: EditSnippetParams) => {
  const response = await api.patch(`/snippets/${snippetId}`, newSnippet);

  return z.object({ updatedCount: z.number() }).parseAsync(response.data);
};

export const useEditSnippet = ({
  mutationConfig,
  snippetId,
}: EditSnippetOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: editSnippet,
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
