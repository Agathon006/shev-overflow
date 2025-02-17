import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'login-form.errors.password-input.length')
  .regex(/[A-Z]/, 'login-form.errors.password-input.big-latin')
  .regex(/[a-z]/, 'login-form.errors.password-input.small-latin')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'login-form.errors.password-input.special');

export type Password = z.infer<typeof passwordSchema>;
