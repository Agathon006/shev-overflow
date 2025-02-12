import { z } from 'zod';

import { commentsSchema } from '@/schemas/comments';
import { marksSchema } from '@/schemas/marks';
import { userSchema } from '@/schemas/user';

export const snippetSchema = z.object({
  id: z.string(),
  code: z.string(),
  language: z.string(),
  marks: marksSchema,
  comments: commentsSchema,
  user: userSchema,
});

export type SnippetSchema = z.infer<typeof snippetSchema>;
