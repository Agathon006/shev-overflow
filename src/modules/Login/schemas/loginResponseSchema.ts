import { z } from 'zod';

export const loginResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.string(),
});
