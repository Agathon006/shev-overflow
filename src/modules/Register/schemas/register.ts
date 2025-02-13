import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(5, 'register-form.errors.username-input.length'),
    password: z
      .string()
      .min(8, 'register-form.errors.password-input.length')
      .regex(/[A-Za-z]/, 'register-form.errors.password-input.latin')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'register-form.errors.password-input.special',
      ),
    confirmPassword: z
      .string()
      .min(8, 'register-form.errors.password-input.length')
      .regex(/[A-Za-z]/, 'register-form.errors.password-input.latin')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'register-form.errors.password-input.special',
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'register-form.errors.confirm-password-input.match',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
