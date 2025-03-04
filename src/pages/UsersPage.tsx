import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { UsersList } from '@/modules/Users';

export const UsersPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {t('users-page.title')}
      </Typography>
      <UsersList />
    </Box>
  );
};
