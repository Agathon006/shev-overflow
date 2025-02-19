import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { notify } from '@/utils/notify';

import { useUpdateUserName } from '../api/updateUserName';
import {
  UpdateProfileSchema,
  updateProfileSchema,
} from '../schemas/changeUsername';

export const UsernameChanger = () => {
  const { t } = useTranslation();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
  });

  const { mutate, isPending } = useUpdateUserName({
    mutationConfig: {
      onSuccess: () => {
        reset();
        notify({
          type: 'success',
          title: t('user-profile.credentials-changer.username-changed'),
        });
      },
    },
  });

  const onSubmit = (data: UpdateProfileSchema) => {
    mutate(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Typography fontWeight={500}>
        {t('user-profile.credentials-changer.change-username-title')}
      </Typography>
      <TextField
        {...register('username')}
        disabled={isPending}
        fullWidth
        margin="normal"
        label={t('user-profile.credentials-changer.new-username-placeholder')}
        error={!!errors.username}
        helperText={
          errors.username?.message ? t(String(errors.username.message)) : ''
        }
      />
      <Button disabled={isPending} type="submit" fullWidth variant="contained">
        {t('user-profile.credentials-changer.button-span-save')}
      </Button>
    </Box>
  );
};
