import { z } from 'zod';

import { passwordSchema } from '@/schemas/password';
import { usernameSchema } from '@/schemas/username';

export const credentialsSchema = z
  .object({
    username: usernameSchema,
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'register-form.errors.confirm-password-input.match',
    path: ['confirmPassword'],
  });

export type CredentialsSchema = z.infer<typeof credentialsSchema>;
