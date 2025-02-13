import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(5, 'login-form.errors.username-input.length'),
  password: z
    .string()
    .min(8, 'login-form.errors.password-input.length')
    .regex(/[A-Z]/, 'login-form.errors.password-input.big-latin')
    .regex(/[a-z]/, 'login-form.errors.password-input.small-latin')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'login-form.errors.password-input.special',
    ),
});

export type LoginSchema = z.infer<typeof loginSchema>;
