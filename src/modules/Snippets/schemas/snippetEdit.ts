import { z } from 'zod';

import { snippetSchema } from '@/schemas/snippet';

export const snippetEditSchema = z.object({
  language: snippetSchema.shape.language.nonempty('Language is required'),
  code: snippetSchema.shape.code.nonempty('Code snippet is required'),
});

export type SnippetEditSchema = z.infer<typeof snippetEditSchema>;
