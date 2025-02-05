import { z } from 'zod';

export const SuccessResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  role: z.string(),
});

export type SuccessResponseType = z.infer<typeof SuccessResponseSchema>;
