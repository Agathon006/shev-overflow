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

const schema = z.object({
  login: z.string().min(1, 'Login is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
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

  const onSubmit = (data: LoginFormInputs) => {
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
          {t('login-form.title')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <TextField
            label={t('login-form.login-input-placeholder')}
            fullWidth
            margin="normal"
            {...register('login')}
            error={!!errors.login}
            helperText={errors.login?.message}
          />
          <TextField
            label={t('login-form.password-input-placeholder')}
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {t('login-form.submit-text')}
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
