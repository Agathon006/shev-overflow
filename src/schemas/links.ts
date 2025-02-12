import { z } from 'zod';

export const linksSchema = z.object({
  current: z.string(),
  last: z.string().optional(),
  next: z.string().optional(),
  first: z.string().optional(),
  previous: z.string().optional(),
});
