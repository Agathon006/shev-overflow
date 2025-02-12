import { z } from 'zod';

import { userSchema } from './user';

export const marksSchema = z
  .array(
    z.object({
      id: z.string(),
      type: z.string(),
      user: userSchema,
    }),
  )
  .nullable();
