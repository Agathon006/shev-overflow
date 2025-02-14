import { useMutation } from '@tanstack/react-query';

import { api } from '@/api/api-client';
import { MutationConfigType } from '@/lib/react-query';

import { SnippetSchema } from '../schemas/snippet';
import { snippetMarkSchema } from '../schemas/snippetMark';

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
  mutationConfig?: MutationConfigType<typeof createSnippetMark>,
) => {
  return useMutation({
    mutationFn: createSnippetMark,
    ...mutationConfig,
  });
};
