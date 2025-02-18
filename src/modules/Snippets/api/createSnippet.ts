import { useMutation } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';

import { snippetSchema } from '../schemas/snippet';
import { SnippetEditSchema } from '../schemas/snippetEdit';

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
  return useMutation({
    mutationFn: createSnippet,
    ...mutationConfig,
  });
};
