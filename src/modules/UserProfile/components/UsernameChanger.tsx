import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  ChangeUsernameSchema,
  changeUsernameSchema,
} from '../schemas/changeUsername';

export const UsernameChanger = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeUsernameSchema>({
    resolver: zodResolver(changeUsernameSchema),
  });

  const onSubmit = (data: ChangeUsernameSchema) => {
    console.log('Username updated:', data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Typography fontWeight={500}>
        {t('user-profile.credentials-changer.change-username-title')}
      </Typography>
      <TextField
        {...register('username')}
        fullWidth
        margin="normal"
        label={t('user-profile.credentials-changer.new-username-placeholder')}
        error={!!errors.username}
        helperText={
          errors.username?.message ? t(String(errors.username.message)) : ''
        }
      />
      <Button type="submit" fullWidth variant="contained">
        {t('user-profile.credentials-changer.button-span-save')}
      </Button>
    </Box>
  );
};
