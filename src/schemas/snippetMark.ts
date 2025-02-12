import { z } from 'zod';

export const snippetMarkSchema = z.object({
  mark: z.literal('like').or(z.literal('dislike')),
});

