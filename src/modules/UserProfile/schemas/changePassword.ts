import { z } from 'zod';

import { passwordSchema } from '@/schemas/password';

export const changePasswordSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'register-form.errors.confirm-password-input.match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'user-profile.errors.new-password-same-as-old',
    path: ['newPassword'],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
