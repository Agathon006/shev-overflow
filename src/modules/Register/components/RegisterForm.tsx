import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Container,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { notify } from '@/utils/notify';

import { useRegister } from '../api/registerUser';
import {
  RegisterSchema,
  registerSchema,
} from '../schemas/register';

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useRegister({
    mutationConfig: {
      onSuccess: (data) => {
        console.log('Registration successful:', data);
        
        notify({
          type: 'success',
          title: t('api.register-form.success'),
        });
      },
    },
  });

  const onSubmit = (data: RegisterSchema) => {
    mutate({ username: data.username, password: data.password });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography component="h1" variant="h5" mb={2}>
          {t('register-form.title')}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <TextField
            label={t('register-form.username-input-placeholder')}
            fullWidth
            margin="normal"
            {...register('username')}
            error={!!errors.username}
            helperText={t(errors.username?.message ?? '')}
          />
          <TextField
            label={t('register-form.password-input-placeholder')}
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={t(errors.password?.message ?? '')}
          />
          <TextField
            label={t('register-form.confirm-password-input-placeholder')}
            type="password"
            fullWidth
            margin="normal"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={t(errors.confirmPassword?.message ?? '')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={isPending}
          >
            {isPending
              ? t('register-form.submit-text.loading')
              : t('register-form.submit-text.register')}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          {t('register-form.exist-account-text')}{' '}
          <MuiLink component={Link} to="/auth/login">
            {t('register-form.login-link-text')}
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};
