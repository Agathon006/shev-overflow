import { z } from 'zod';

export const registerResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.string(),
});
export type RegisterResponseType = z.infer<typeof registerResponseSchema>;
