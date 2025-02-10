import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(5, 'register-form.errors.username-input.length'),
    password: z
      .string()
      .min(8, 'login-form.errors.password-input.length')
      .regex(/[A-Za-z]/, 'login-form.errors.password-input.length'),
    confirmPassword: z
      .string()
      .min(8, 'login-form.errors.password-input.length')
      .regex(/[A-Za-z]/, 'login-form.errors.password-input.length'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'register-form.errors.confirm-password-input.match',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
