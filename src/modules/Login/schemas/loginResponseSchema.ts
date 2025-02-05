import { z } from 'zod';

export const loginResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.string(),
});
export type LoginResponseType = z.infer<typeof loginResponseSchema>;
