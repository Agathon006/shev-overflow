import { z } from 'zod';

export const commentsSchema = z
  .array(
    z.object({
      id: z.string(),
      content: z.string(),
    }),
  )
  .nullable();
