import { z } from 'zod';

import { userSchema } from './user';

export const commentSchema = z.object({
  id: z.string(),
  content: z.string(),
  user: userSchema.optional(),
});

export type CommentSchema = z.infer<typeof commentSchema>;
