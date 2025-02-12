import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  role: z.string(),
  username: z.string(),
});
