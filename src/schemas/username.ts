import { z } from 'zod';

import { userSchema } from './user';

export const usernameSchema = userSchema.shape.username.min(
  5,
  'login-form.errors.username-input.length',
);

export type Username = z.infer<typeof usernameSchema>;
