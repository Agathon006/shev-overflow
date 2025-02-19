import { Box, Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { PasswordChanger } from './PasswordChanger';
import { UsernameChanger } from './UsernameChanger';

export const CredentialsChanger = () => {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: 'auto',
        boxShadow: 3,
        borderRadius: 2,
        mx: 'auto',
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('user-profile.credentials-changer.title')}
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
          gap={3}
        >
          <UsernameChanger />
          <PasswordChanger />
        </Box>
      </CardContent>
    </Card>
  );
};
