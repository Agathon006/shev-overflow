import { z } from 'zod';

import { usernameSchema } from '@/schemas/username';

export const updateProfileSchema = z.object({
  username: usernameSchema,
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
