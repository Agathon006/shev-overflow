import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Container,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { loginUser } from '@/api';

const schema = z.object({
  login: z.string().min(1, 'login-form.errors.login-input.required'),
  password: z.string().min(6, 'login-form.errors.password-input.length'),
});

type LoginFormInputs = {
  login: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Login successful:', data);
    },
    onError: (err) => {
      console.error('Login failed:', err.message);
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutate(data);
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
          {t('login-form.title')}
        </Typography>

        {isError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {(error as Error).message || t('login-form.submit-result-text.fail')}
          </Alert>
        )}

        {isSuccess && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            {t('login-form.submit-result-text.success')}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <TextField
            label={t('login-form.login-input-placeholder')}
            fullWidth
            margin="normal"
            {...register('login')}
            error={!!errors.login}
            helperText={t(errors.login?.message ?? '')}
          />
          <TextField
            label={t('login-form.password-input-placeholder')}
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={t(errors.password?.message ?? '')}
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
              ? t('login-form.submit-text.loading')
              : t('login-form.submit-text.login')}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          {t('login-form.no-account-text')}{' '}
          <MuiLink component={Link} to="/auth/register">
            {t('login-form.register-link-text')}
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};
