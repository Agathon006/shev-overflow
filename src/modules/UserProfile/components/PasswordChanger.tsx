import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  ChangePasswordSchema,
  changePasswordSchema,
} from '../schemas/changePassword';

export const PasswordChanger = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({ resolver: zodResolver(changePasswordSchema) });

  const onSubmit = (data: ChangePasswordSchema) => {
    console.log('Password updated:', data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Typography fontWeight={500}>
        {t('user-profile.credentials-changer.change-password-title')}
      </Typography>
      <TextField
        {...register('oldPassword')}
        type="password"
        fullWidth
        margin="normal"
        label={t('user-profile.credentials-changer.old-password-placeholder')}
        error={!!errors.oldPassword}
        helperText={
          errors.oldPassword?.message
            ? t(String(errors.oldPassword.message))
            : ''
        }
      />
      <TextField
        {...register('newPassword')}
        type="password"
        fullWidth
        margin="normal"
        label={t('user-profile.credentials-changer.new-password-placeholder')}
        error={!!errors.newPassword}
        helperText={
          errors.newPassword?.message
            ? t(String(errors.newPassword.message))
            : ''
        }
      />
      <TextField
        {...register('confirmPassword')}
        type="password"
        fullWidth
        margin="normal"
        label={t(
          'user-profile.credentials-changer.new-password-confirm-placeholder',
        )}
        error={!!errors.confirmPassword}
        helperText={
          errors.confirmPassword?.message
            ? t(String(errors.confirmPassword.message))
            : ''
        }
      />
      <Button type="submit" fullWidth variant="contained">
        {t('user-profile.credentials-changer.button-span-change-password')}
      </Button>
    </Box>
  );
};
