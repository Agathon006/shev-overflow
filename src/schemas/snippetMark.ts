import { z } from 'zod';

export const snippetMarkSchema = z.object({
  mark: z.enum(['like', 'dislike', 'none']),
});
