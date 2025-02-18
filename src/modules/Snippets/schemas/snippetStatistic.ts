import { z } from 'zod';

import { userSchema } from '@/schemas/user';

export const snippetStatisticSchema = z.object({
  id: z.string(),
  code: z.string(),
  commentsCount: z.number(),
  dislikesCount: z.number(),
  isDislikedByUser: z.number(),
  isLikedByUser: z.number(),
  language: z.string(),
  likesCount: z.number(),
  user: userSchema,
});

export type SnippetStatisticSchema = z.infer<typeof snippetStatisticSchema>;
