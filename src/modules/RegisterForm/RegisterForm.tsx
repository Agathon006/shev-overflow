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
import { z } from 'zod';

const schema = z
  .object({
    login: z.string().min(1, 'register-form.errors.login-input.required'),
    password: z.string().min(6, 'register-form.errors.password-input.length'),
    confirmPassword: z
      .string()
      .min(6, 'register-form.errors.confirm-password-input.length'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'register-form.errors.confirm-password-input.match',
    path: ['confirmPassword'],
  });

type RegisterFormInputs = {
  login: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    console.log('Form Data:', data);
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
            label={t('register-form.login-input-placeholder')}
            fullWidth
            margin="normal"
            {...register('login')}
            error={!!errors.login}
            helperText={t(errors.login?.message ?? '')}
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
          >
            {t('register-form.submit-text')}
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
