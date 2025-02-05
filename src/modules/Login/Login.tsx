import { zodResolver } from '@hookform/resolvers/zod';
import {
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

import { api } from '@/api/axiosInstance';

const schema = z.object({
  username: z.string().min(5, 'login-form.errors.username-input.length'),
  password: z.string().min(5, 'login-form.errors.password-input.length'),
});

type LoginFormInputs = z.infer<typeof schema>;

type ApiError = {
  message: string;
  statusCode?: number;
};

const loginUser = async (credentials: LoginFormInputs) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
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

        <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <TextField
            label={t('login-form.username-input-placeholder')}
            fullWidth
            margin="normal"
            {...register('username')}
            error={!!errors.username}
            helperText={t(errors.username?.message ?? '')}
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
