import { z } from 'zod';

import { passwordSchema } from '@/schemas/password';
import { usernameSchema } from '@/schemas/username';

export const registerSchema = z
  .object({
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'register-form.errors.confirm-password-input.match',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
