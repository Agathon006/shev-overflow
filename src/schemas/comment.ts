import { z } from 'zod';

export const commentSchema = z.object({
  id: z.string(),
  content: z.string(),
});

export type CommentSchema = z.infer<typeof commentSchema>;
