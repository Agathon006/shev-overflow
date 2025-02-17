import { z } from 'zod';

import { passwordSchema } from '@/schemas/password';
import { usernameSchema } from '@/schemas/username';

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
