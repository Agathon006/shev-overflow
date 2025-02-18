import { z } from 'zod';

export const snippetEditSchema = z.object({
  language: z.string().nonempty('Language is required'),
  code: z.string().nonempty('Code snippet is required'),
});

export type SnippetEditSchema = z.infer<typeof snippetEditSchema>;
