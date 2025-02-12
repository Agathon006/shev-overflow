import { z } from 'zod';

import { commentsSchema } from '@/schemas/comments';
import { linksSchema } from '@/schemas/links';
import { marksSchema } from '@/schemas/marks';
import { userSchema } from '@/schemas/user';

const snippetsSchema = z.array(
  z.object({
    id: z.string(),
    code: z.string(),
    language: z.string(),
    marks: marksSchema,
    comments: commentsSchema,
    user: userSchema,
  }),
);

export type SnippetsSchema = z.infer<typeof snippetsSchema>;

export const snippetsResponseSchema = z.object({
  data: snippetsSchema,
  links: linksSchema,
});
