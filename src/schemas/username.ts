import { z } from 'zod';

export const usernameSchema = z
  .string()
  .min(5, 'login-form.errors.username-input.length');

export type Username = z.infer<typeof usernameSchema>;
