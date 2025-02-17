import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { credentialsSchema } from '../schemas/credentials';

export const CredentialsChanger = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(credentialsSchema) });

  const onSubmit = (data: unknown) => {
    console.log('Form submitted:', data);
  };

  return (
    <Box
      maxWidth={600}
      mx="auto"
      p={4}
      boxShadow={3}
      borderRadius={2}
      bgcolor="white"
    >
      <Typography variant="h6" gutterBottom>
        {t('user-profile.credentials-changer.title')}
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
        gap={3}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography fontWeight={500}>
            {t('user-profile.credentials-changer.change-username-title')}
          </Typography>
          <TextField
            {...register('username')}
            fullWidth
            margin="normal"
            label={t(
              'user-profile.credentials-changer.new-username-placeholder',
            )}
            error={!!errors.username}
            helperText={t(
              errors.username?.message
                ? t(String(errors.username.message))
                : '',
            )}
          />
          <Button type="submit" fullWidth variant="contained">
            {t('user-profile.credentials-changer.button-span-save')}
          </Button>
        </form>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography fontWeight={500}>
            {t('user-profile.credentials-changer.change-password-title')}
          </Typography>
          <TextField
            {...register('oldPassword')}
            type="password"
            fullWidth
            margin="normal"
            label={t(
              'user-profile.credentials-changer.old-password-placeholder',
            )}
            error={!!errors.oldPassword}
            helperText={t(
              errors.oldPassword?.message
                ? t(String(errors.oldPassword.message))
                : '',
            )}
          />
          <TextField
            {...register('newPassword')}
            type="password"
            fullWidth
            margin="normal"
            label={t(
              'user-profile.credentials-changer.new-password-placeholder',
            )}
            error={!!errors.newPassword}
            helperText={t(
              errors.newPassword?.message
                ? t(String(errors.newPassword.message))
                : '',
            )}
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
            helperText={t(
              errors.confirmPassword?.message
                ? t(String(errors.confirmPassword.message))
                : '',
            )}
          />
          <Button type="submit" fullWidth variant="contained">
            {t('user-profile.credentials-changer.button-span-change-password')}
          </Button>
        </form>
      </Box>
    </Box>
  );
};
