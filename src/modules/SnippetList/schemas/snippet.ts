import { z } from 'zod';

import { commentsSchema } from '@/schemas/comments';
import { linksSchema } from '@/schemas/links';
import { marksSchema } from '@/schemas/marks';
import { userSchema } from '@/schemas/user';

const snippetSchema = z.object({
  id: z.string(),
  code: z.string(),
  language: z.string(),
  marks: marksSchema,
  comments: commentsSchema,
  user: userSchema,
});

export type SnippetSchema = z.infer<typeof snippetSchema>;

export const SnipetListSchema = z.object({
  data: z.array(snippetSchema),
  links: linksSchema,
});
