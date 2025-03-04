import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/api/auth';
import { Spinner } from '@/components/Spinner';
import { CredentialsChanger, UserProfileCard } from '@/modules/UserProfile';

export const AccountPage = () => {
  const { t } = useTranslation();
  const { data: currentUser, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  return (
    <Container
      maxWidth="xl"
      sx={{
        width: '100%',
        marginTop: 2,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography textAlign={'center'} variant="h4">
        {t('account-page.title')}
        <Typography
          component="span"
          sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}
          color="secondary"
          display="inline"
        >
          {currentUser?.username}
        </Typography>
      </Typography>
      <UserProfileCard user={currentUser} isCurrentUser />
      <CredentialsChanger />
    </Container>
  );
};
