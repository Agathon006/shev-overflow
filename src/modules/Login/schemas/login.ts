import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(5, 'login-form.errors.username-input.length'),
  password: z
    .string()
    .min(8, 'login-form.errors.password-input.length')
    .regex(/[A-Za-z]/, 'login-form.errors.password-input.length'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
