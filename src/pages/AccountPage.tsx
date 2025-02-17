import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/api/auth';
// import { Page404 } from '@/components/Page404';
import { Spinner } from '@/components/Spinner';
import { CredentialsChanger, UserProfileCard } from '@/modules/UserProfile';

export const AccountPage = () => {
  const { t } = useTranslation();
  const { data: currentUser, isLoading } = useAuth();

  // if (!snippet) {
  //   return <Page404 />;
  // }

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
        {isLoading ? <Spinner /> : currentUser?.username}
      </Typography>
      {isLoading ? (
        <Spinner />
      ) : (
        <UserProfileCard userId={currentUser?.id || ''} />
      )}
      <CredentialsChanger />
    </Container>
  );
};
