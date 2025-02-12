import { z } from 'zod';

import { userSchema } from './user';

export const markSchema = z.object({
  id: z.string(),
  type: z.string(),
  user: userSchema,
});
