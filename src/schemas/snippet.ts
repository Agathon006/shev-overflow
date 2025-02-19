import { z } from 'zod';

import { commentSchema } from '@/schemas/comment';
import { markSchema } from '@/schemas/mark';
import { userSchema } from '@/schemas/user';

export const snippetSchema = z.object({
  id: z.string(),
  code: z.string(),
  language: z.string(),
  marks: z.array(markSchema),
  comments: z.array(commentSchema),
  user: userSchema,
});

export type SnippetSchema = z.infer<typeof snippetSchema>;
